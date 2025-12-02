from django.db import models
from django.conf import settings
from urllib.parse import quote_plus
from django.contrib.auth.models import User


def center_image_upload(instance, filename):
    return f"centers/{instance.name}/{filename}"


class Doctor(models.Model):
    user = models.OneToOneField(User, null=True, blank=True, on_delete=models.SET_NULL)
    name = models.CharField(max_length=150)
    specialty = models.CharField(max_length=120, blank=True)
    phone = models.CharField(max_length=32, blank=True)

    center = models.ForeignKey("clinic.Center", null=True, blank=True,on_delete=models.SET_NULL, related_name="doctor_set")

    timing = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.name


class Center(models.Model):
    name = models.CharField(max_length=255)
    address = models.TextField(blank=True, null=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    pincode = models.CharField(max_length=10)

    phone = models.CharField(max_length=15)  # Frontend expects phone
    website = models.CharField(max_length=255, blank=True)

    rating = models.FloatField(default=0.0)
    popular = models.BooleanField(default=False)

    specialties = models.JSONField(default=list)  # <- ARRAY
    timing = models.CharField(max_length=100, blank=True)
    doctors = models.IntegerField(default=0)

    latitude = models.FloatField(default=0.0)
    longitude = models.FloatField(default=0.0)

    image1 = models.ImageField(upload_to=center_image_upload, null=True, blank=True)
    image2 = models.ImageField(upload_to=center_image_upload, null=True, blank=True)

    map_image_url = models.URLField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def generate_map_url(self):
        api_key = getattr(settings, "GOOGLE_MAPS_API_KEY", None)
        if not api_key:
            return ""
        address = quote_plus(f"{self.name}, {self.city}, {self.state}")
        url = (
            f"https://maps.googleapis.com/maps/api/staticmap?"
            f"center={address}&zoom=14&size=600x300&maptype=roadmap"
            f"&markers=color:red%7Clabel:C%7C{address}"
            f"&key={api_key}"
        )
        return url

    def save(self, *args, **kwargs):
        if not self.map_image_url:
            try:
                self.map_image_url = self.generate_map_url()
            except Exception:
                self.map_image_url = ""
        super().save(*args, **kwargs)
