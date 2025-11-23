from rest_framework import serializers
from .models import PatientProfile

class PatientProfileSerializer(serializers.ModelSerializer):
    email = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = PatientProfile
        # include all fields so frontend can update everything
        fields = [
            "id",
            "user",
            "full_name",
            "gender",
            "dob",
            "phone",
            "email",
            "address",
            "marital_status",
            "occupation",
            "lifestyle",
            "emergency_contact_name",
            "emergency_contact_relation",
            "emergency_contact_phone",
            "preferred_communication",
            "blood_group",
            "height",
            "weight",
            "allergies",
            "current_medication",
            "past_medical_history",
            "current_symptoms",
            "addictions",
            "blood_pressure",
            "pulse_rate",
            "menstrual_history",
            "prakriti",
            "vikriti",
            "seasonal_allergies",
            "body_type_tendency",
            "contraindications",
            "treatment_goals",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["user", "created_at", "updated_at", "email"]

    def get_email(self, obj):
        # Prefer stored profile email, but fallback to user.email
        return obj.email or (obj.user.email if obj.user else None)

    def validate(self, data):
        # basic validation: required fields on creation
        request = self.context.get("request")
        if request and request.method in ("POST",):
            required = ["full_name", "phone", "address"]
            missing = [f for f in required if not data.get(f)]
            if missing:
                raise serializers.ValidationError(
                    { "missing_fields": f"Required fields missing: {', '.join(missing)}" }
                )
        return data
