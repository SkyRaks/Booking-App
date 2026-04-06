from django.urls import path
from .views import *

urlpatterns = [
    path("register/", CreateGuestView.as_view(), name="register-guest"),
]