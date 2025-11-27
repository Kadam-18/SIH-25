# backend/urls.py
from django.urls import path, include
from django.contrib import admin
from django.http import JsonResponse

def home(request):
    return JsonResponse({"message": "Backend working successfully!"})

urlpatterns = [
    path('', home),

    path('admin/', admin.site.urls),

    # Accounts (signup, login, OTP)
    path('api/', include('accounts.urls')),

    # Patient profile
    path('api/patient/', include('patients.urls')),

    # Appointments API
    path('api/appointments/', include('appointments.urls')),

    # Centers API
    path('api/centers/', include('centers.urls')),
]
