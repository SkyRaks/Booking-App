from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *
from ..properties.models import *

class OwnerCreateSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField()

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
        )

        owner = Owner.objects.create(user=user)
        return owner
