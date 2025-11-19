from django.db import models

# Create your models here.


from django.db import models
from django.contrib.auth.models import User

class PatientProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")

    full_name = models.CharField(max_length=100)
    age = models.IntegerField(null=True, blank=True)
    gender = models.CharField(max_length=20, choices=[
        ("Male", "Male"),
        ("Female", "Female"),
        ("Other", "Other"),
    ], null=True, blank=True)

    phone = models.CharField(max_length=15)
    address = models.TextField()

    height = models.FloatField(null=True, blank=True)   # in CM
    weight = models.FloatField(null=True, blank=True)   # in KG

    allergies = models.TextField(blank=True, null=True)
    current_health_condition = models.TextField(blank=True, null=True)
    current_medication = models.CharField(max_length=100, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} ({self.user.email})"
