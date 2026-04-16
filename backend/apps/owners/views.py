from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated

from .serializers import *

# Create your views here.
@method_decorator(csrf_exempt, name="dispatch")
class CreateOwnerView(APIView):
    # OWNER AUTH VIEW
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

class AddPropertyView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = OwnerAddPropertySerializer(data=request.data, context={"request": request})

        if serializer.is_valid():
            data = serializer.save()

            return Response({
                "message": "propery added",
                "data": {
                    "id": data.id,
                    "title": data.title
                }
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
