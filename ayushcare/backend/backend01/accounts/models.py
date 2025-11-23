from django.db import models
from django.contrib.auth.models import User
import random
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
