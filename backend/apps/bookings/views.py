from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models import *
from .serializers import *

# Create your views here.

class BookPropertyView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = BookingCreateSerializer(data=request.data)

        if serializer.is_valid():
            booking = serializer.save()

            return Response({"message": "property booked", "id": booking.id}, status=status.HTTP_201_CREATED)
        
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class GetBookingsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        bookings = Booking.objects.all()

        data = []

        for b in bookings:
            data.append({
                "id": b.id,
                "guestNum": b.number_of_guests,
                "property": b.property.title,
                "dateFrom": b.start_date,
                "dateTo": b.end_date,
                "total_price": b.total_price,
                "status": b.status
            })
        return Response(data, status=status.HTTP_200_OK)
        