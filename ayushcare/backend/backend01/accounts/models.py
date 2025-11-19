# from django.db import models  

# Create your models here.
from django.db import models
from django.contrib.auth.models import User
import random

from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import User
from patients.models import PatientProfile

class EmailOTP(models.Model):
    email = models.EmailField(unique=True)
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)

    def generate_otp(self):
        self.otp = str(random.randint(100000, 999999))
        self.save()

@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        PatientProfile.objects.create(user=instance)