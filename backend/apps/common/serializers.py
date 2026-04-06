from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()
    role = serializers.CharField()

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")
        role = data.get("role") # guest for example
        print("role: ", role)

        try:
            user = User.objects.get(email=email)
            if not hasattr(user, role):
                raise serializers.ValidationError("invalid role")
        except User.DoesNotExist:
            raise serializers.ValidationError("invalid credentials")

        user = authenticate(username=user.username, password=password, role=role)  
        print("user: ", user)
        if not user:
            raise serializers.ValidationError("invalid credentials")
        
        data["user"] = user
        data["role"] = role
        return data