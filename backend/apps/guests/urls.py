from django.urls import path
from .views import *

urlpatterns = [
    path("create/", CreateGuestView.as_view(), name="create-guest"),
]