from celery import shared_task
from datetime import timedelta
from django.utils import timezone
from .models import Appointment

@shared_task
def send_pre_reminder(appointment_id):
    # load appointment, use pyfcm + Notification model to send
    ...

@shared_task
def schedule_reminders():
    # find appointments and schedule send_pre_reminder.apply_async(...)
    ...
