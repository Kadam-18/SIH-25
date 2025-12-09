from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password, check_password
from django.core.mail import send_mail
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken

from django.db import IntegrityError

import random
from .models import EmailOTP, UserSettings
from .serializers import SignupSerializer, VerifyOTPSerializer, LoginSerializer, UserSettingsSerializer


class SignupView(APIView):
    def post(self, request):
        data = request.data
        serializer = SignupSerializer(data=data)

        if serializer.is_valid():

            email = data["email"]
            username = data["username"]
            password = data["password"]
            role = data.get("role", "patient")  # optional
            phone = data.get("phone")

            # Create or update OTP entry
            otp_entry, created = EmailOTP.objects.get_or_create(email=email)
            otp_entry.generate_otp()
            
            # Store temporary password + username + role
            otp_entry.temp_password = password
            otp_entry.temp_username = username
            otp_entry.temp_role = role
            otp_entry.temp_phone = phone
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

        if not serializer.is_valid():
            return Response(
                {"success": False, "errors": serializer.errors},
                status=400
            )

        email = serializer.validated_data["email"]
        otp = serializer.validated_data["otp"]

        otp_entry = EmailOTP.objects.filter(email=email).first()
        if not otp_entry:
            return Response(
                {"success": False, "message": "OTP expired or not found"},
                status=400
            )

        if otp_entry.is_expired():
            otp_entry.delete()
            return Response(
                {"success": False, "message": "OTP has expired. Please request a new one."},
                status=400
            )

        if not otp_entry.is_valid(otp):
            return Response(
                {"success": False, "message": "Invalid OTP"},
                status=400
            )

        if User.objects.filter(email=email).exists():
            otp_entry.delete()
            return Response(
                {"success": False, "message": "User already exists. Please login."},
                status=400
            )

        try:
            user = User.objects.create(
                username=otp_entry.temp_username,
                email=email,
                password=make_password(otp_entry.temp_password),
            )
        except IntegrityError:
            return Response(
                {"success": False, "message": "Account already exists"},
                status=400
            )

        otp_entry.delete()

        # Attach phone (if provided) to patient profile
        if hasattr(user, "patient_profile"):
            if otp_entry.temp_phone:
                user.patient_profile.phone = otp_entry.temp_phone
                user.patient_profile.email = user.email
                user.patient_profile.full_name = otp_entry.temp_username
                user.patient_profile.save()

        return Response(
            {"success": True, "message": "Signup successful"},
            status=200
        )

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            identifier = serializer.validated_data["email"]
            password = serializer.validated_data["password"]

            # Lookup by email, username, or phone (patient profile)
            user = None
            if "@" in identifier:
                user = User.objects.filter(email=identifier).first()
            if user is None:
                user = User.objects.filter(username=identifier).first()
            if user is None:
                try:
                    from patients.models import PatientProfile
                    profile = PatientProfile.objects.filter(phone=identifier).select_related("user").first()
                    if profile:
                        user = profile.user
                except Exception:
                    user = None

            if not user:
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


class UserSettingsView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        """Get user settings"""
        try:
            settings = UserSettings.objects.get(user=request.user)
        except UserSettings.DoesNotExist:
            # Create default settings if they don't exist
            settings = UserSettings.objects.create(user=request.user)
        
        serializer = UserSettingsSerializer(settings)
        return Response({
            "success": True,
            "data": serializer.data
        }, status=status.HTTP_200_OK)
    
    def put(self, request):
        """Update user settings"""
        try:
            settings = UserSettings.objects.get(user=request.user)
        except UserSettings.DoesNotExist:
            settings = UserSettings.objects.create(user=request.user)
        
        serializer = UserSettingsSerializer(settings, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "success": True,
                "message": "Settings updated successfully",
                "data": serializer.data
            }, status=status.HTTP_200_OK)
        
        return Response({
            "success": False,
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class UpdateProfileView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request):
        """Update user profile information"""
        user = request.user
        data = request.data
        
        # Update user fields
        if 'first_name' in data:
            user.first_name = data['first_name']
        if 'last_name' in data:
            user.last_name = data['last_name']
        if 'email' in data:
            user.email = data['email']
        
        # Update profile picture if provided
        profile_picture = request.FILES.get('profile_picture')
        if profile_picture:
             pass
        
        user.save()
        
        # Also update patient profile if it exists
        from patients.models import PatientProfile
        try:
            patient_profile = PatientProfile.objects.get(user=user)
            if 'phone' in data:
                patient_profile.phone = data['phone']
            if 'address' in data:
                patient_profile.address = data['address']
            if 'dob' in data:
                patient_profile.dob = data['dob']
            if 'gender' in data:
                patient_profile.gender = data['gender']
            patient_profile.save()
        except PatientProfile.DoesNotExist:
            pass
        
        return Response({
            "success": True,
            "message": "Profile updated successfully"
        }, status=status.HTTP_200_OK)


class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request):
        """Change user password"""
        user = request.user
        data = request.data
        
        current_password = data.get('current_password')
        new_password = data.get('new_password')
        confirm_password = data.get('confirm_password')
        
        if not current_password or not new_password or not confirm_password:
            return Response({
                "success": False,
                "message": "All password fields are required"
            }, status=status.HTTP_400_BAD_REQUEST)
        
        if not check_password(current_password, user.password):
            return Response({
                "success": False,
                "message": "Current password is incorrect"
            }, status=status.HTTP_400_BAD_REQUEST)
        
        if new_password != confirm_password:
            return Response({
                "success": False,
                "message": "New passwords do not match"
            }, status=status.HTTP_400_BAD_REQUEST)
        
        if len(new_password) < 8:
            return Response({
                "success": False,
                "message": "Password must be at least 8 characters long"
            }, status=status.HTTP_400_BAD_REQUEST)
        
        user.password = make_password(new_password)
        user.save()
        
        return Response({
            "success": True,
            "message": "Password changed successfully"
        }, status=status.HTTP_200_OK)


class LogoutAllDevicesView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        """Logout from all devices by blacklisting all tokens"""
        user = request.user
        
        # Blacklist all outstanding tokens for this user
        tokens = OutstandingToken.objects.filter(user=user)
        for token in tokens:
            BlacklistedToken.objects.get_or_create(token=token)
        
        return Response({
            "success": True,
            "message": "Logged out from all devices successfully"
        }, status=status.HTTP_200_OK)
