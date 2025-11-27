# appointments/views.py
from rest_framework import generics, permissions, serializers
from rest_framework.response import Response
from .models import Appointment, Doctor
from centers.models import Center
from .serializers import AppointmentSerializer, DoctorSerializer

# If you use Notification model uncomment this:
# from notifications.models import Notification


# -----------------------------
# Appointment Create
# -----------------------------
class AppointmentCreateView(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = AppointmentSerializer
    queryset = Appointment.objects.all()

    def perform_create(self, serializer):
        center = serializer.validated_data["center"]
        doctor = serializer.validated_data["doctor"]

        if doctor.center != center:
            raise serializers.ValidationError("Selected doctor does not belong to this center.")

        appointment = serializer.save(patient=self.request.user)

        # OPTIONAL: If you don't have Notification model, comment this block
        # Notification.objects.create(
        #     patient=appointment.patient,
        #     message=f"Your appointment with {doctor.name} at {center.name} on {appointment.date} is confirmed."
        # )


# -----------------------------
# User Appointments
# -----------------------------
class UserAppointmentsListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = AppointmentSerializer

    def get_queryset(self):
        return Appointment.objects.filter(patient=self.request.user)


# -----------------------------
# Single Appointment Actions
# -----------------------------
class AppointmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = AppointmentSerializer
    queryset = Appointment.objects.all()
    lookup_field = "id"


# -----------------------------
# Doctors List
# -----------------------------
class DoctorListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = DoctorSerializer
    queryset = Doctor.objects.all()


class DoctorDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = DoctorSerializer
    queryset = Doctor.objects.all()


# -----------------------------
# Doctors filtered by Center
# -----------------------------
class DoctorsByCenterView(generics.ListAPIView):
    serializer_class = DoctorSerializer

    def get_queryset(self):
        center_id = self.kwargs["center_id"]
        return Doctor.objects.filter(center_id=center_id)
