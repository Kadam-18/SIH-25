from django.urls import path, include
from django.contrib import admin
from django.http import JsonResponse

def home(request):
    return JsonResponse({"message": "Backend working successfully!"})

urlpatterns = [
    path('', home),
    path('admin/', admin.site.urls),
    path('api/', include('accounts.urls')),        # accounts endpoints (signup, login, otp)
    path('api/patient/', include('patients.urls')), # patient profile endpoints
]
