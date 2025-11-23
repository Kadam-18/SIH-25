from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User

class UserDevice(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    # device_token = models.CharField(max_length=255)
    device_token = models.TextField()
    device_type = models.CharField(max_length=20, default="web")  # web / android / ios
    # created_at = models.DateTimeField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.device_type}"
