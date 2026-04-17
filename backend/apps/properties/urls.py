from django.urls import path
from .views import *

urlpatterns = [
    path("featured/", PropertiesView.as_view(), name="featured-properties"),
    path("<int:id>/", PropertyView.as_view(), name="select-property"),
    path("add-property/", AddPropertyView.as_view(), name="add-property")
]