from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Guest(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='guests/', null=True, blank=True) # for now idk where tosave cuz i want to use s3 later

    def __str__(self):
        return str(self.user)
    
    @property
    def name(self):
        if self.user.first_name and self.user.last_name:
            return f"{self.user.first_name} {self.user.last_name}"
        elif self.user.first_name:
            return self.user.first_name
        else:
            return self.user.username