from django.db import models
from ..owners.models import *

# Create your models here.
class Property(models.Model):
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE)
    title = models.CharField(max_length=150, null=False, blank=False)
    description = models.CharField(max_length=300, null=False, blank=False)
    location = models.CharField(max_length=100, null=False, blank=False)
    price_per_night = models.FloatField(null=False, blank=False) #idk what else properties
    number_of_guests = models.IntegerField(default=1)
    amenities = models.JSONField(null=True, blank=True)
    # photos = models.ImageField(upload_to='properties/', null=False, blank=False)
    rooms = models.IntegerField(default=1) # number of rooms

class PropertyImage(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='properties/')

class Room(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    name = models.CharField(max_length=20, null=False, blank=False) # like bedroom, living room etc
    price_per_night = models.FloatField(null=False, blank=False)
