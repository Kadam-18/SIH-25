# centers/models.py
from django.db import models
from django.conf import settings
from urllib.parse import quote_plus

def center_image_upload(instance, filename):
    return f"centers/{instance.name}/{filename}"

class Center(models.Model):
    name = models.CharField(max_length=255)
    address = models.TextField(blank=True, null=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    pincode = models.CharField(max_length=10)
    contact_number = models.CharField(max_length=15)

    image1 = models.ImageField(upload_to=center_image_upload, null=True, blank=True)
    image2 = models.ImageField(upload_to=center_image_upload, null=True, blank=True)

    # store a generated static-map URL for preview (no lat/long stored)
    map_image_url = models.URLField(blank=True, null=True)

    description = models.TextField(blank=True, null=True)
    available_services = models.TextField(blank=True, null=True)  # comma separated or JSON

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def generate_map_url(self):
        # Build a Google Static Map URL from center name + city + state (no lat/long)
        # Requires GOOGLE_MAPS_API_KEY in Django settings or .env
        api_key = getattr(settings, "GOOGLE_MAPS_API_KEY", None)
        if not api_key:
            return ""
        center_q = quote_plus(f"{self.name}, {self.city}, {self.state}")
        # size can be tuned to the frontend card dimensions
        url = (
            f"https://maps.googleapis.com/maps/api/staticmap?"
            f"center={center_q}&zoom=14&size=600x300&maptype=roadmap"
            f"&markers=color:red%7Clabel:C%7C{center_q}"
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
