# appointments/serializers.py
from rest_framework import serializers
from .models import Appointment
from clinic.models import Doctor
from django.contrib.auth.models import User
from clinic.models import Center


class DoctorSerializer(serializers.ModelSerializer):
    center_id = serializers.PrimaryKeyRelatedField(
        queryset=Center.objects.all(),
        source="center",
        write_only=True,
        required=False,
        allow_null=True
    )

    class Meta:
        model = Doctor
        fields = ["id", "name", "specialty", "phone", "clinic", "timing", "center_id", "center"]


class AppointmentSerializer(serializers.ModelSerializer):
    # Read doctor data
    doctor = DoctorSerializer(read_only=True)

    # Allow passing doctor_id in POST
    doctor_id = serializers.PrimaryKeyRelatedField(
        queryset=Doctor.objects.all(),
        source="doctor",
        write_only=True,
        required=True
    )

    # Allow center_id in POST
    center_id = serializers.PrimaryKeyRelatedField(
        queryset=Center.objects.all(),
        source="center",
        write_only=True,
        required=True
    )

    patient_username = serializers.CharField(source="patient.username", read_only=True)

    class Meta:
        model = Appointment
        fields = [
            "id", "patient", "patient_username",
            "doctor", "doctor_id",
            "center_id",
            "date", "time", "appointment_type",
            "location_name", "building", "room",
            "notes", "status",
            "created_at", "updated_at"
        ]
        read_only_fields = ["id", "patient", "created_at", "updated_at", "patient_username"]

    def create(self, validated_data):
        request = self.context.get("request")
        validated_data["patient"] = request.user
        return super().create(validated_data)
