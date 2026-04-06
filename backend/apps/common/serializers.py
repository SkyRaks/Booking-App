from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class LoginSerializer(serializers.Serializer):
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
        
        data["user"] = user
        return data