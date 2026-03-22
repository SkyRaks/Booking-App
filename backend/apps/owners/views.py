from django.shortcuts import render
# from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny

from .serializers import OwnerCreateSerializer

# Create your views here.
@method_decorator(csrf_exempt, name="dispatch")
class CreateOwnerView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = OwnerCreateSerializer(data=request.data)

        if serializer.is_valid():
            owner = serializer.save()

            return Response({
                "id": owner.id,
                "username": owner.user.username,
                "email": owner.user.email,
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
