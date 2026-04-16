from django.shortcuts import render, get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models import *
from .serializers import *

# Create your views here.

# class PropertyView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         # OWNER'S PROPERTIES NOT FINISHED
#         properties = Property.objects.filter(owner=request.user.owner)
#         data = [{
#             "id": p.id,
#             "title": p.title
#         } for p in properties]

#         return Response(data, status=status.HTTP_200_OK)

#     def post(self, request):
#         serializer = PropertyCreateSerializer(data=request.data)

#         if serializer.is_valid():
#             property = serializer.save(owner=request.user.owner)

#             return Response({
#                 "id": property.id,
#                 "title": property.title
#             }, status=status.HTTP_201_CREATED)
        
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PropertiesView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        # HOME PAGE PROPERTIES FEATURED
        properties = Property.objects.all() # later some filters

        data = []
        for p in properties:
            images = p.images.all()

            data.append({
                "id": p.id,
                "owner": p.owner.name,
                "title": p.title,
                "description": p.description,
                "location": p.location,
                "price_per_night": float(p.price_per_night),
                "number_of_guests": p.number_of_guests,
                "amenities": p.amenities,
                "rooms": p.rooms,
                "images": [img.image.url for img in images]
            }) # for images later with S3
        return Response(data, status=status.HTTP_200_OK)    

class PropertyView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, id):
        # SELECT ONE PROPERTY 
        property = get_object_or_404(Property, id=id)

        images = PropertyImage.objects.filter(property=property)
        rooms = Room.objects.filter(property=property)

        prop_images = [
            {"image": img.image.url}
            for img in images
        ]

        rooms_list = [
            {"name": room.name, "price_per_night": room.price_per_night}
            for room in rooms
        ]

        return Response({
            "id": property.id,
            "title": property.title,
            "description": property.description,
            "location": property.location,
            "price_per_night": property.price_per_night,
            "number_of_guests": property.number_of_guests,
            "amenities": property.amenities,
            "images": prop_images,
            "rooms_list": rooms_list,
        }, status=status.HTTP_200_OK)


# {
#   "id": 1,
#   "title": "Modern Apartment",
#   "description": "...",
#   "location": "Toronto",
#   "price_per_night": 120,
#   "number_of_guests": 3,
#   "amenities": ["wifi", "kitchen"],
#   "images": [
#     { "image": "/media/properties/1.jpg" }
#   ],
#   "rooms_list": [
#     { "name": "Bedroom", "price_per_night": 80 }
#   ]
# }
