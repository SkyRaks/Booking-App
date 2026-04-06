from django.urls import path
from .views import *

urlpatterns = [
    path("refresh/", RefreshTokensView.as_view(), name="refresh-tokens"),
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
]