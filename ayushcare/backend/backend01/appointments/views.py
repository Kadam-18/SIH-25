# # appointments/views.py
# from rest_framework import generics, permissions, serializers
# from .models import Appointment
# from clinic.models import Doctor
# from .serializers import AppointmentSerializer, DoctorSerializer


# # ----------------------------------
# # Create Appointment
# # ----------------------------------
# class AppointmentCreateView(generics.CreateAPIView):
#     permission_classes = [permissions.IsAuthenticated]
#     serializer_class = AppointmentSerializer
#     queryset = Appointment.objects.all()

#     def perform_create(self, serializer):
#         doctor = serializer.validated_data["doctor"]

#         serializer.save(
#             patient=self.request.user,
#             center=doctor.center  # ✅ center inferred from doctor
#         )


# # ----------------------------------
# # Appointment Detail (GET / PUT / DELETE)
# # ----------------------------------
# class AppointmentDetailView(generics.RetrieveUpdateDestroyAPIView):
#     permission_classes = [permissions.IsAuthenticated]
#     serializer_class = AppointmentSerializer
#     queryset = Appointment.objects.all()
#     lookup_field = "id"


# # ----------------------------------
# # Logged-in User Appointments
# # ----------------------------------
# class UserAppointmentsListView(generics.ListAPIView):
#     permission_classes = [permissions.IsAuthenticated]
#     serializer_class = AppointmentSerializer

#     def get_queryset(self):
#         return Appointment.objects.filter(patient=self.request.user)


# # ----------------------------------
# # Doctors by Center
# # ----------------------------------
# class DoctorsByCenterView(generics.ListAPIView):
#     serializer_class = DoctorSerializer

#     def get_queryset(self):
#         center_id = self.kwargs["center_id"]
#         return Doctor.objects.filter(center_id=center_id)



# appointments/views.py
# appointments/views.py
from rest_framework import generics, permissions, serializers
from .models import Appointment
from clinic.models import Doctor, Center
from .serializers import AppointmentSerializer, DoctorSerializer


class AppointmentCreateView(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = AppointmentSerializer
    queryset = Appointment.objects.all()

    def perform_create(self, serializer):
        doctor = serializer.validated_data["doctor"]
        center = serializer.validated_data["center_id"]

        if doctor.center_id != center.id:
            raise serializers.ValidationError(
                {"doctor": "Doctor does not belong to selected center"}
            )

        serializer.save(patient=self.request.user)


class UserAppointmentsListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = AppointmentSerializer

    def get_queryset(self):
        return Appointment.objects.filter(patient=self.request.user)


class DoctorsByCenterView(generics.ListAPIView):
    serializer_class = DoctorSerializer

    def get_queryset(self):
        return Doctor.objects.filter(center_id=self.kwargs["center_id"])
