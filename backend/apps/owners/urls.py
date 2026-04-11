from django.urls import path
from .views import *

urlpatterns = [
    path("register/", CreateOwnerView.as_view(), name="register-owner"),
    path("add-property/", AddPropertyView.as_view(), name="add-property")
]