from django.urls import path
from .views import *

urlpatterns = [
    path("get-properties/", GetPropertyView.as_view(), name="get-properties"),
]