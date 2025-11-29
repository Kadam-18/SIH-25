# appointments/urls.py
# appointments/urls.py
from django.urls import path
from .views import (
    AppointmentCreateView,
    UserAppointmentsListView,
    DoctorsByCenterView,
)

urlpatterns = [
    path("create/", AppointmentCreateView.as_view(), name="appointment-create"),
    path("my/", UserAppointmentsListView.as_view(), name="my-appointments"),
    path(
        "center/<int:center_id>/doctors/",
        DoctorsByCenterView.as_view(),
        name="doctors-by-center",
    ),
]
