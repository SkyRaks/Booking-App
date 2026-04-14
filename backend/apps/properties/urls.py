from django.urls import path
from .views import *

urlpatterns = [
    path("", PropertyView.as_view(), name="properties"),
    path("featured/", PropertiesView.as_view(), name="featured-properties"),
]