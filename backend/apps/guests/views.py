from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated

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
