from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models import *
from .serializers import *

# Create your views here.

class PropertyView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        properties = Property.objects.filter(owner=request.user.owner)
        data = [{
            "id": p.id,
            "title": p.title
        } for p in properties]

        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = PropertyCreateSerializer(data=request.data)

        if serializer.is_valid():
            property = serializer.save(owner=request.user.owner)

            return Response({
                "id": property.id,
                "title": property.title
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
