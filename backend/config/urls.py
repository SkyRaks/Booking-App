from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    path('owners/', include("apps.owners.urls")),
    path('guests/', include("apps.guests.urls")),

    path('common/', include("apps.common.urls")),

    path('properties/', include("apps.properties.urls")),
    path('bookings/', include("apps.bookings.urls")),
]
