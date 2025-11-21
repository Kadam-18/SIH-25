from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password, check_password
from django.core.mail import send_mail
from rest_framework_simplejwt.tokens import RefreshToken

import random
from .models import EmailOTP
from .serializers import SignupSerializer, VerifyOTPSerializer, LoginSerializer


class SignupView(APIView):
    def post(self, request):
        data = request.data
        serializer = SignupSerializer(data=data)

        if serializer.is_valid():

            email = data["email"]
            username = data["username"]
            password = data["password"]
            role = data.get("role", "patient")  # optional

            # Create or update OTP entry
            otp_entry, created = EmailOTP.objects.get_or_create(email=email)
            otp_entry.generate_otp()
            
            # Store temporary password + username + role
            otp_entry.temp_password = password
            otp_entry.temp_username = username
            otp_entry.temp_role = role
            otp_entry.save()

            # Send OTP Email
            send_mail(
                subject="Your AyushCare OTP",
                message=f"Your OTP is {otp_entry.otp}",
                from_email="yourgmail@gmail.com",  # change to your real Gmail
                recipient_list=[email],
            )

            return Response(
                {"success": True, "message": "OTP sent to your email"},
                status=status.HTTP_200_OK
            )

        return Response({"success": False, "errors": serializer.errors}, status=400)


class VerifyOTPView(APIView):
    def post(self, request):
        serializer = VerifyOTPSerializer(data=request.data)

        if serializer.is_valid():
            email = serializer.validated_data["email"]
            otp = serializer.validated_data["otp"]

            try:
                otp_entry = EmailOTP.objects.get(email=email)
            except EmailOTP.DoesNotExist:
                return Response({"success": False, "message": "OTP not found"}, status=404)

            if otp_entry.otp != otp:
                return Response({"success": False, "message": "Invalid OTP"}, status=400)

            # Create user with stored values
            user = User.objects.create(
                username=otp_entry.temp_username,
                email=email,
                password=make_password(otp_entry.temp_password),
            )

            # Done → delete OTP entry
            otp_entry.delete()

            return Response(
                {"success": True, "message": "Signup successful"},
                status=200
            )

        return Response({"success": False, "errors": serializer.errors}, status=400)


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            email = serializer.validated_data["email"]
            password = serializer.validated_data["password"]

            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                return Response({"success": False, "message": "User not found"}, status=404)

            if not check_password(password, user.password):
                return Response({"success": False, "message": "Incorrect password"}, status=400)

            refresh = RefreshToken.for_user(user)

            return Response({
                "success": True,
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "user": user.username,
            })

        return Response({"success": False, "errors": serializer.errors}, status=400)
