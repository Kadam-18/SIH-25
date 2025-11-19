from django.shortcuts import render

# Create your views here.


from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password, check_password
from django.core.mail import send_mail
from rest_framework_simplejwt.tokens import RefreshToken

from .models import EmailOTP
from .serializers import SignupSerializer, VerifyOTPSerializer, LoginSerializer

class SignupView(APIView):
    def post(self, request):
        data = request.data
        serializer = SignupSerializer(data=data)

        if serializer.is_valid():
            email = data["email"]

            otp_entry, created = EmailOTP.objects.get_or_create(email=email)
            otp_entry.generate_otp()

            send_mail(
                "Your OTP Code",
                f"Your OTP is {otp_entry.otp}",
                "your_email@example.com",
                [email],
            )

            return Response({"message": "OTP sent to email"}, status=200)

        return Response(serializer.errors, status=400)


class VerifyOTPView(APIView):
    def post(self, request):
        serializer = VerifyOTPSerializer(data=request.data)

        if serializer.is_valid():
            email = serializer.validated_data["email"]
            otp = serializer.validated_data["otp"]

            try:
                otp_entry = EmailOTP.objects.get(email=email)
            except EmailOTP.DoesNotExist:
                return Response({"error": "OTP not found"}, status=404)

            if otp_entry.otp != otp:
                return Response({"error": "Invalid OTP"}, status=400)

            User.objects.create(
                username=email,
                email=email,
                password=make_password("defaultPassword"),
            )

            otp_entry.delete()

            return Response({"message": "Signup successful"}, status=200)

        return Response(serializer.errors, status=400)


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            email = serializer.validated_data["email"]
            password = serializer.validated_data["password"]

            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                return Response({"error": "User not found"}, status=404)

            if not check_password(password, user.password):
                return Response({"error": "Incorrect password"}, status=400)

            refresh = RefreshToken.for_user(user)

            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user": user.username,
            }, status=200)

        return Response(serializer.errors, status=400)
