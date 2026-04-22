from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models import *
from .serializers import *

# Create your views here.

class BookPropertyView(APIView):
    # REWORK TOMORROW
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = BookingCreateSerializer(data=request.data)

        if serializer.is_valid():
            booking = serializer.save()

            return Response({"message": "property booked", "id": booking.id}, status=status.HTTP_201_CREATED)
        
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        