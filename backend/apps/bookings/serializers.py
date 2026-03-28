from rest_framework import serializers
# from django.contrib.auth.models import User
from .models import *

class BookingCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Booking
        fields = ["property", "start_date", "end_date"]
    
    def create(self, validated_data):
        request = self.context["request"]
        owner = request.user.owner

        property = validated_data["property"]
        start_date = validated_data["start_date"]
        end_date = validated_data["end_date"]

        days = (end_date - start_date).days

        total_price = property.price_per_night * days


        return Booking.objects.create(
            property=property,
            owner=owner, 
            start_date=start_date,
            end_date=end_date,
            total_price=total_price)
