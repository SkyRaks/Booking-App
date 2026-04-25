from django.urls import path
from .views import *

urlpatterns = [
    path("book-property/", BookPropertyView.as_view(), name="book-property"),
    path("", GetBookingsView.as_view(), name="get-bookings"),
]