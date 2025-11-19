from django.contrib import admin

# Register your models here.


from django.contrib import admin
from .models import Appointment, Doctor

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ("id", "patient", "doctor", "date", "time", "status")
    list_filter = ("status", "appointment_type", "date")
    search_fields = ("patient__username", "doctor__name", "location_name")

@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "specialty", "clinic")
    search_fields = ("name", "specialty", "clinic")
