from django.urls import path
from .views import *

urlpatterns = [
    path("create/", CreateBookingView.as_view(), name="create-booking"),
]