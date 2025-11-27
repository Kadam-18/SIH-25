# appointments/models.py
from django.db import models
from django.contrib.auth.models import User

class Doctor(models.Model):
    """
    Doctor belongs to a Center (optional).
    """
    user = models.OneToOneField(User, null=True, blank=True, on_delete=models.SET_NULL)
    name = models.CharField(max_length=150)
    specialty = models.CharField(max_length=120, blank=True)
    phone = models.CharField(max_length=32, blank=True)
    clinic = models.CharField(max_length=200, blank=True)

    # link to center (string reference to avoid circular imports)
    center = models.ForeignKey("centers.Center", null=True, blank=True, on_delete=models.SET_NULL, related_name="doctors")

    # timing slots (4-hour gaps)
    DOCTOR_TIMINGS = [
        ("10am-2pm", "10:00 AM - 2:00 PM"),
        ("2pm-6pm", "02:00 PM - 06:00 PM"),
        ("6pm-10pm", "06:00 PM - 10:00 PM"),
    ]
    timing = models.CharField(max_length=20, choices=DOCTOR_TIMINGS, blank=True)

    def __str__(self):
        return self.name


class Appointment(models.Model):
    STATUS_CHOICES = [
        ("scheduled", "Scheduled"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
        ("checked_in", "Checked-in"),
        ("rescheduled", "Rescheduled"),
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
