from rest_framework import serializers
from django.shortcuts import get_object_or_404
from .models import *

class BookingCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ["propertyId", "checkIn", "checkOut", "total"]

    propertyId = serializers.CharField()
    checkIn = serializers.CharField()
    checkOut = serializers.CharField()
    total = serializers.FloatField()

    def create(self, validated_data):
        propertyId = validated_data["propertyId"]
        property = get_object_or_404(Property, id=int(propertyId))

        start_date = validated_data["checkIn"]
        end_date = validated_data["checkOut"]
        total = validated_data["total"]

        return Booking.objects.create(
            property=property,
            owner=property.owner, 
            start_date=start_date,
            end_date=end_date,
            total_price=float(total))
