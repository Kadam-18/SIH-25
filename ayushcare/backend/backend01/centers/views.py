from django.shortcuts import render

# Create your views here.
# centers/views.py
from rest_framework import generics, permissions
from clinic.models import Center
from .serializers import CenterSerializer

class CenterListView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Center.objects.all().order_by("name")
    serializer_class = CenterSerializer
    
    def get_serializer_context(self):
        """Add request to context for building absolute URLs"""
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

class CenterDetailView(generics.RetrieveAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = Center.objects.all()
    serializer_class = CenterSerializer
    
    def get_serializer_context(self):
        """Add request to context for building absolute URLs"""
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
