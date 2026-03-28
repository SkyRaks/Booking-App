from django.db import models

from ..properties.models import *
from ..owners.models import *

# Create your models here.
class Bookings(models.Model):
    property = models.OneToOneField(Property, on_delete=models.CASCADE)
    owner = models.OneToOneField(Owner, on_delete=models.CASCADE)

    start_date = models.DateField()
    end_date = models.DateField()

    total_price = models.FloatField()

    status = models.CharField(max_length=50, default="pending") # pending, confirmed, cancelled

    created_at = models.DateTimeField(auto_now_add=True)
