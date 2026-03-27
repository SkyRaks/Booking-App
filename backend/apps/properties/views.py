from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models import *

# Create your views here.

class GetPropertyView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        properties = Property.objects.filter(owner=request.user.owner)
        data = [{
            "id": p.id,
            "title": p.title
        } for p in properties]

        return Response(data, status=status.HTTP_200_OK)
