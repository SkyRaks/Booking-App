from django.urls import path
from .views import *

urlpatterns = [
    path("register/", CreateGuestView.as_view(), name="register-guest"),
    path("login/", LoginGuestView.as_view(), name="login-guest"),
    path("logout/", LogoutGuestView.as_view(), name="logout-guest"),
]