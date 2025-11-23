
from rest_framework import serializers
from .models import Appointment, Doctor
from django.contrib.auth.models import User

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ["id", "name", "specialty", "phone", "clinic"]

class AppointmentSerializer(serializers.ModelSerializer):
    # show nested doctor details if present
    doctor = DoctorSerializer(read_only=True)
    doctor_id = serializers.PrimaryKeyRelatedField(
        queryset=Doctor.objects.all(), source="doctor", write_only=True, required=False, allow_null=True
    )

    # include patient summary
    patient_username = serializers.CharField(source="patient.username", read_only=True)

    class Meta:
        model = Appointment
        fields = [
            "id", "patient", "patient_username", "doctor", "doctor_id",
            "date", "time", "appointment_type",
            "location_name", "building", "room",
            "notes", "status", "created_at", "updated_at"
        ]
        read_only_fields = ["id", "patient", "created_at", "updated_at", "patient_username"]

    def create(self, validated_data):
        # doctor is nested in source="doctor" when using doctor_id
        request = self.context.get("request")
        # set the patient to the authenticated user
        if request and hasattr(request, "user"):
            validated_data["patient"] = request.user
        return super().create(validated_data)
