from django.contrib import admin

# Register your models here.
from .models import Doctor, Center

admin.site.register(Doctor)
admin.site.register(Center)