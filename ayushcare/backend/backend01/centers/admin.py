from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Center
from appointments.models import Doctor

class DoctorInline(admin.TabularInline):
    model = Doctor
    extra = 1

@admin.register(Center)
class CenterAdmin(admin.ModelAdmin):
    list_display = ("name", "city", "contact_number")
    inlines = [DoctorInline]
