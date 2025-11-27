from django.db import models
from django.contrib.auth.models import User
import random
# from centers.models import Center
from patients.models import PatientProfile
from django.db.models.signals import post_save
from django.dispatch import receiver

class EmailOTP(models.Model):
    email = models.EmailField(unique=True)
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)

    temp_username = models.CharField(max_length=150, null=True, blank=True)
    temp_password = models.CharField(max_length=200, null=True, blank=True)
    temp_role = models.CharField(max_length=50, null=True, blank=True)

    def generate_otp(self):
        self.otp = str(random.randint(100000, 999999))
        self.save()


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        PatientProfile.objects.create(user=instance)

# class Doctor(models.Model):
#     """
#     Doctor belongs to a Center (optional).
#     """
#     user = models.OneToOneField(User, null=True, blank=True, on_delete=models.SET_NULL)
#     name = models.CharField(max_length=150)
#     specialty = models.CharField(max_length=120, blank=True)
#     phone = models.CharField(max_length=32, blank=True)
#     clinic = models.CharField(max_length=200, blank=True)

#     # link to center (string reference to avoid circular imports)
#     center = models.ForeignKey("centers.Center", null=True, blank=True, on_delete=models.SET_NULL, related_name="doctors")

#     # timing slots (4-hour gaps)
#     DOCTOR_TIMINGS = [
#         ("10am-2pm", "10:00 AM - 2:00 PM"),
#         ("2pm-6pm", "02:00 PM - 06:00 PM"),
#         ("6pm-10pm", "06:00 PM - 10:00 PM"),
#     ]
#     timing = models.CharField(max_length=20, choices=DOCTOR_TIMINGS, blank=True)

#     def __str__(self):
#         return self.name

