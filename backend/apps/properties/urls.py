from django.urls import path
from .views import *

urlpatterns = [
    # path("", PropertyView.as_view(), name="properties"), # idk about this...
    path("featured/", PropertiesView.as_view(), name="featured-properties"),
    path("<int:id>/", PropertyView.as_view(), name="select-property")
]