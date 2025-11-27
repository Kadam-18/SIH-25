# appointments/urls.py
from django.urls import path
from .views import (
    AppointmentCreateView, UserAppointmentsListView, AppointmentDetailView,
    DoctorListCreateView, DoctorDetailView, DoctorsByCenterView
)

urlpatterns = [
    # appointments
    path("create/", AppointmentCreateView.as_view(), name="appointment-create"),
    path("user/", UserAppointmentsListView.as_view(), name="appointments-user"),
    path("detail/<int:id>/", AppointmentDetailView.as_view(), name="appointment-detail"),

    # doctors
    path("doctors/", DoctorListCreateView.as_view(), name="doctors-list-create"),
    path("doctors/<int:pk>/", DoctorDetailView.as_view(), name="doctor-detail"),

    # doctors by center
    path("center/<int:center_id>/doctors/", DoctorsByCenterView.as_view(), name="doctors-by-center"),
]
