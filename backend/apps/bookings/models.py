from django.db import models

from ..properties.models import *
from ..owners.models import *

# Create your models here.
class Booking(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE)

    start_date = models.DateField()
    end_date = models.DateField()

    total_price = models.FloatField()
    number_of_guests = models.IntegerField()
    status = models.CharField(max_length=50, default="pending") # pending, confirmed, cancelled

    created_at = models.DateTimeField(auto_now_add=True)
