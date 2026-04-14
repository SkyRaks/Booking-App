from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

class PropertyImageCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ["image"]

class RoomCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ["name", "price_per_night"]
    
class PropertyCreateSerializer(serializers.ModelSerializer):
    images = PropertyImageCreateSerializer(many=True, required=False)
    rooms = RoomCreateSerializer(many=True, required=False)

    class Meta:
        model = Property
        fields = ["title", "description", "location", "price_per_night", "number_of_guests", "amenities", "images", "rooms"]
    
    def create(self, validated_data):
        images_data = validated_data.pop("images", [])
        rooms_data = validated_data.pop("rooms", [])

        property = Property.objects.create(**validated_data)

        for room in rooms_data:
            Room.objects.create(property=property, **room)
        
        for image in images_data:
            PropertyImage.objects.create(property=property, **image)
        return property
