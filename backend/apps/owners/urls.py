from django.urls import path
from .views import *

urlpatterns = [
    path("create/", CreateOwnerView.as_view(), name="create-owner"),
]