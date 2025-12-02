from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import timedelta
import random
# from centers.models import Center
from patients.models import PatientProfile
from django.db.models.signals import post_save
from django.dispatch import receiver

class EmailOTP(models.Model):
    email = models.EmailField(unique=True)
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    OTP_EXPIRY_MINUTES = 5  # OTP valid for 5 minutes

    temp_username = models.CharField(max_length=150, null=True, blank=True)
    temp_password = models.CharField(max_length=200, null=True, blank=True)
    temp_role = models.CharField(max_length=50, null=True, blank=True)

    def generate_otp(self):
        self.otp = str(random.randint(100000, 999999))
        self.save()
    
    def is_expired(self):
        """Check if OTP has expired (5 minutes)"""
        if not self.created_at:
            return True
        expiry_time = self.created_at + timedelta(minutes=self.OTP_EXPIRY_MINUTES)
        return timezone.now() > expiry_time
    
    def is_valid(self, otp):
        """Check if OTP is valid and not expired"""
        if self.is_expired():
            return False
        return self.otp == otp


class UserSettings(models.Model):
    """User preferences and settings"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="settings")
    
    # Notification Preferences
    email_notifications = models.BooleanField(default=True)
    appointment_reminders = models.BooleanField(default=True)
    therapy_updates = models.BooleanField(default=True)
    doctor_messages = models.BooleanField(default=True)
    
    # Appointment Preferences
    default_reminder_time = models.IntegerField(default=24)  # hours before appointment
    preferred_center_id = models.IntegerField(null=True, blank=True)
    notification_sound = models.BooleanField(default=True)
    
    # Health Preferences
    medical_conditions = models.JSONField(default=list, blank=True)  # Array of tags
    ayurvedic_body_type = models.CharField(max_length=50, blank=True, null=True)
    health_notes = models.TextField(blank=True, null=True)
    
    # App UI Preferences
    theme = models.CharField(
        max_length=10,
        choices=[("light", "Light"), ("dark", "Dark")],
        default="light"
    )
    time_format = models.CharField(
        max_length=10,
        choices=[("12", "12-hour"), ("24", "24-hour")],
        default="12"
    )
    language = models.CharField(max_length=10, default="en")  # en, hi, es, fr, etc.
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Settings for {self.user.username}"


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        PatientProfile.objects.create(user=instance)
        UserSettings.objects.create(user=instance)

# Note: Doctor model is defined in clinic/models.py
# This file only contains EmailOTP model and signal handlers
