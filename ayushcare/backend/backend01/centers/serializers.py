# centers/serializers.py
from rest_framework import serializers
from .models import Center

class CenterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Center
        fields = [
            "id", "name", "address", "city", "state", "pincode", "contact_number",
            "image1", "image2", "map_image_url", "description", "available_services",
        ]
