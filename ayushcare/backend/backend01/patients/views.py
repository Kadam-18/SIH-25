from django.shortcuts import render

# Create your views here.


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .models import PatientProfile
from .serializers import PatientProfileSerializer

class PatientProfileView(APIView):
    permission_classes = [IsAuthenticated]

    # GET profile of logged-in user
    def get(self, request):
        try:
            profile = request.user.profile
            serializer = PatientProfileSerializer(profile)
            return Response(serializer.data, status=200)
        except PatientProfile.DoesNotExist:
            return Response({"message": "Profile not created yet"}, status=404)

    # POST — first time user fills form
    def post(self, request):
        serializer = PatientProfileSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response({"message": "Profile created", "data": serializer.data}, status=201)

        return Response(serializer.errors, status=400)

    # PUT — user updates profile
    def put(self, request):
        try:
            profile = request.user.profile
        except PatientProfile.DoesNotExist:
            return Response({"message": "Profile not found"}, status=404)

        serializer = PatientProfileSerializer(profile, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Profile updated", "data": serializer.data}, status=200)

        return Response(serializer.errors, status=400)
