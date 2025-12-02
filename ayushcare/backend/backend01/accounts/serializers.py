from rest_framework import serializers
from .models import UserSettings


class SignupSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField()
    role = serializers.CharField(required=False, default="patient")


class VerifyOTPSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField()


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()


class UserSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSettings
        fields = [
            "email_notifications",
            "appointment_reminders",
            "therapy_updates",
            "doctor_messages",
            "default_reminder_time",
            "preferred_center_id",
            "notification_sound",
            "medical_conditions",
            "ayurvedic_body_type",
            "health_notes",
            "theme",
            "time_format",
            "language",
        ]
