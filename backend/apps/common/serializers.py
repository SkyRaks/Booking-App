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
        role = data.get("role") 

        try:
            user = User.objects.get(email=email)
            if not hasattr(user, role):
                raise serializers.ValidationError({"role": "invalid role"})
        except User.DoesNotExist:
            raise serializers.ValidationError({"non_field_errors": "invalid credentials"})

        user = authenticate(username=user.username, password=password, role=role)  
        if not user:
            raise serializers.ValidationError({"non_field_errors": "invalid credentials"})
        
        data["user"] = user
        data["role"] = role
        return data