from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *
import json

class OwnerAddPropertySerializer(serializers.Serializer):
    title = serializers.CharField()
    description = serializers.CharField()
    location = serializers.CharField()
    price_per_night = serializers.FloatField()
    number_of_guests = serializers.IntegerField()
    amenities = serializers.CharField()
    rooms = serializers.IntegerField()
    rooms_list = serializers.CharField()
    
    def create(self, validated_data):
        print("serializer check")
        request = self.context['request']

        amenities = json.loads(validated_data['amenities'])
        rooms_list = json.loads(validated_data['rooms_list'])

        owner = request.user.owner

        prop = Property.objects.create(
            owner = owner,
            title = validated_data['title'],
            description = validated_data['description'],
            location = validated_data['location'],
            price_per_night = validated_data['price_per_night'],
            number_of_guests = validated_data['number_of_guests'],
            amenities = amenities,
            rooms = validated_data['rooms'],
        )
        print("pass prop")
        images = request.FILES.getlist("images")
        for img in images:
            PropertyImage.objects.create(
                property = prop,
                image = img,    
            )
        print("pass images")

        for room in rooms_list:
            room = Room.objects.create(
                property = prop,
                name = room['name'],
                price_per_night = room['price_per_night'],
            )
        print("pass rooms")
        return prop
