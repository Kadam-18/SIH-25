from django.contrib import admin

# Register your models here.
from .models import Doctor, Center

# Note: Center is registered in centers/admin.py to avoid duplicate registration
# This file is kept for DoctorInline if needed elsewhere

class DoctorInline(admin.TabularInline):
    model = Doctor
    extra = 1