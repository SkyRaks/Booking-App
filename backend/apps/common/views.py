from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

# from .serializers import *

# Create your views here.

@method_decorator(csrf_exempt, name="dispatch")
class RefreshTokensView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            # print(request.COOKIES)
            refreshToken = request.COOKIES.get("refreshToken")

            if not refreshToken:
                return Response({
                    "error": "no refresh token"
                }, status=status.HTTP_400_BAD_REQUEST)
            refresh = RefreshToken(refreshToken)
            accessToken = str(refresh.access_token)

            user_id = refresh.payload.get("user_id")
            user = User.objects.get(id=user_id)

            role = None
            if hasattr(user, "guest"):
                role = "guest"
            elif hasattr(user, "owner"):
                role = "owner"

            return Response({
                "access": accessToken,
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "role": role,
                }
            })
        except Exception as e:
            print("other error ", e)
            return Response({
                "error": "invalid refresh token"
            }, status=status.HTTP_403_FORBIDDEN)
