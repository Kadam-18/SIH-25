from rest_framework import serializers
from .models import UserDevice

class UserDeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDevice
        fields = ["id", "user", "device_token", "device_type"]
