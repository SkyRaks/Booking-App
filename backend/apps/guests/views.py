from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import *

# Create your views here.

@method_decorator(csrf_exempt, name="dispatch")
class CreateGuestView(APIView):
    # GUEST AUTH VIEW
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = GuestCreateSerializer(data=request.data)

        if serializer.is_valid():
            guest = serializer.save()

            return Response({
                "id": guest.id,
                "username": guest.user.username,
                "email": guest.user.email,
            }, status=status.HTTP_201_CREATED)
        
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@method_decorator(csrf_exempt, name="dispatch")
class LoginGuestView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = GuestLoginSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.validated_data["user"]
            refresh = RefreshToken.for_user(user)

            response = Response({
                "message": "logged in",
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "role": "guest"
                }
            })

            response.set_cookie(
                key="refreshToken",
                value=str(refresh),
                httponly=True,
                secure=True,
                samesite="None"
            )
            return response
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutGuestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refreshToken = request.COOKIES.get("refreshToken")
            print("cookies", request.COOKIES)
            print("refresh token: ", refreshToken)

            if not refreshToken:
                return Response({"error": "no refresh token"}, status=status.HTTP_400_BAD_REQUEST)
            token = RefreshToken(refreshToken)
            token.blacklist()

            response = Response({
                "message": "logged out",
            }, status=status.HTTP_205_RESET_CONTENT)
            response.delete_cookie("refreshToken")

            return response
        except Exception as e:
            return Response({
                "error": "invalid token"
            }, status=status.HTTP_400_BAD_REQUEST)
