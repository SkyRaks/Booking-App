from django.urls import path
from .views import *

urlpatterns = [
    path("", PropertyView.as_view(), name="properties"),
]