from django.urls import path
from . import views

urlpatterns = [
    path("register-device/", views.register_device),
    path("send/", views.send_notification),
    path("broadcast/", views.broadcast_notification),

]
