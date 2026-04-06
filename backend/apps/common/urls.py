from django.urls import path
from .views import *

urlpatterns = [
    path("refresh/", RefreshTokensView.as_view(), name="refresh-tokens"),
]