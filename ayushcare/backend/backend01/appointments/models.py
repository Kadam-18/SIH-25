from django.db import models

# Create your models here.


from django.db import models
from django.contrib.auth.models import User

class Doctor(models.Model):
    """
    Optional: a simple Doctor/Provider model.
    You can extend this later (specialty, contact, photo, etc).
    """
    user = models.OneToOneField(User, null=True, blank=True, on_delete=models.SET_NULL)
    name = models.CharField(max_length=150)
    specialty = models.CharField(max_length=120, blank=True)
    phone = models.CharField(max_length=32, blank=True)
    clinic = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.name

class Appointment(models.Model):
    """
    Appointment model for scheduling therapies / consultations.
    - patient: user who booked (required)
    - doctor: optional provider
    - date: date of appointment
    - time: time of appointment (as timefield)
    - appointment_type: therapy / consultation / follow-up
    - location_name / building / room: details of location
    - notes: optional
    - status: scheduled/completed/cancelled/checked-in
    """
    STATUS_CHOICES = [
        ("scheduled", "Scheduled"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
        ("checked_in", "Checked-in"),
    ]

    APPT_TYPE_CHOICES = [
        ("therapy", "Therapy"),
        ("consultation", "Consultation"),
        ("followup", "Follow-up"),
        ("other", "Other"),
    ]

    patient = models.ForeignKey(User, related_name="appointments", on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, null=True, blank=True, on_delete=models.SET_NULL)
    date = models.DateField()
    time = models.TimeField()
    appointment_type = models.CharField(max_length=30, choices=APPT_TYPE_CHOICES, default="therapy")

    location_name = models.CharField(max_length=200, blank=True)
    building = models.CharField(max_length=200, blank=True)
    room = models.CharField(max_length=50, blank=True)

    notes = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="scheduled")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-date", "-time"]

    def __str__(self):
        return f"Appt {self.id} | {self.patient.username} | {self.date} {self.time} | {self.status}"
