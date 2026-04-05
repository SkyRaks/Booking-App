from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import Guest
from rest_framework_simplejwt.tokens import RefreshToken
# from ..properties.models import *

class GuestCreateSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField()

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
        )

        guest = Guest.objects.create(user=user)
        return guest

class GuestLoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError("invalid credentials")

        user = authenticate(username=user.username, password=password)  
        if not user:
            raise serializers.ValidationError("invalid credentials")

        if not hasattr(user, "guest"):
            raise serializers.ValidationError("not a guest")
        
        data["user"] = user
        return data
