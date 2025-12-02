from django.urls import path
from .views import (
    SignupView, VerifyOTPView, LoginView,
    UserSettingsView, UpdateProfileView, ChangePasswordView, LogoutAllDevicesView
)

urlpatterns = [
    path("auth/signup/", SignupView.as_view()),
    path("auth/verify-otp/", VerifyOTPView.as_view()),
    path("auth/login/", LoginView.as_view()),
    
    # Settings endpoints
    path("user/settings/", UserSettingsView.as_view()),
    path("user/update-profile/", UpdateProfileView.as_view()),
    path("user/change-password/", ChangePasswordView.as_view()),
    path("logout-all-devices/", LogoutAllDevicesView.as_view()),
]
