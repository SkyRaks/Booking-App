from django.db import models
from ..owners.models import *

# Create your models here.
class Property(models.Model):
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE)
    title = models.CharField(max_length=150, null=False, blank=False)
    description = models.TextField(max_length=300, null=False, blank=False)
    location = models.CharField(max_length=100, null=False, blank=False)
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False) #idk what else properties
    number_of_guests = models.IntegerField(default=1)
    amenities = models.JSONField(null=True, blank=True)
    rooms = models.IntegerField(default=1) # number of rooms
    created_at = models.DateTimeField(auto_now_add=True)

class PropertyImage(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to='properties/')

class Room(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name="rooms_list")
    name = models.CharField(max_length=50, null=False, blank=False) # like bedroom, living room etc
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False)
