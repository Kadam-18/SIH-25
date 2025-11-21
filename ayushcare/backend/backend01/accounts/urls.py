from django.urls import path
from .views import SignupView, VerifyOTPView, LoginView

urlpatterns = [
    path("auth/signup/", SignupView.as_view()),
    path("auth/verify-otp/", VerifyOTPView.as_view()),
    path("auth/login/", LoginView.as_view()),
]
