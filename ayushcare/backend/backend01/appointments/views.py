from django.shortcuts import render

# Create your views here.

from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Appointment, Doctor
from .serializers import AppointmentSerializer, DoctorSerializer
from django.shortcuts import get_object_or_404

from datetime import datetime, timedelta
from .tasks import (
    send_pre_procedure_reminder,
    send_post_procedure_reminder
)

# permission: only authenticated users
class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission: only owners (patient) or staff can modify an appointment.
    """

    def has_object_permission(self, request, view, obj):
        # safe methods allowed
        if request.method in permissions.SAFE_METHODS:
            return True
        # staff (clinic admins) can edit
        if request.user.is_staff:
            return True
        # owner can edit
        return obj.patient == request.user


# Create appointment
class AppointmentCreateView(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = AppointmentSerializer

    def perform_create(self, serializer):
        # serializer.create will set patient from request context
        serializer.save(patient=self.request.user)


# List appointments for the logged-in user
class UserAppointmentsListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = AppointmentSerializer

    def get_queryset(self):
        user = self.request.user
        return Appointment.objects.filter(patient=user).order_by("-date", "-time")


# Retrieve / Update / Delete single appointment
class AppointmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    serializer_class = AppointmentSerializer
    queryset = Appointment.objects.all()
    lookup_field = "id"

    def perform_update(self, serializer):
        # if status is changed to cancelled or rescheduled, you may trigger notifications here
        instance = serializer.save()
        # e.g. call a helper: notify_appointment_update(instance)


class DoctorListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = DoctorSerializer
    queryset = Doctor.objects.all()

class DoctorDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = DoctorSerializer
    queryset = Doctor.objects.all()
