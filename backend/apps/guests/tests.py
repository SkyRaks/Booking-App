from django.test import TestCase
from django.contrib.auth.models import User
from django.urls import reverse

from rest_framework.test import APIClient

from apps.owners.models import *
from apps.bookings.models import *
from apps.properties.models import *
from apps.guests.models import *

# Create your tests here.

class GuestModelTest(TestCase): 
    def create_guest(self):
        user = User.objects.create_user(username="oliverGuest", email="test@mail.com", password="password123")
        guest = Guest.objects.create(user=user)
        
        return guest
    
    def get_token(self):
        client = APIClient()
        url = reverse("token_obtain_pair")

        res = client.post(url, {
            "username": "oliverGuest",
            "password": "password123",
        }, format="json")

        return res.data["access"]

    def test_guest_model_exists(self):
        guests = Guest.objects.count() # get all guests

        self.assertEqual(guests, 0) # if equal to 0 return 
    
    def test_can_create_guest(self):
        guest = self.create_guest()

        self.assertEqual(Guest.objects.count(), 1)
        self.assertEqual(guest.user.username, "oliverGuest")
    
    def test_can_get_tokens(self):
        self.create_guest()

        client = APIClient()
        url = reverse("token_obtain_pair")

        res = client.post(url, {
            "username": "oliverGuest",
            "password": "password123",
        }, format="json")

        self.assertEqual(res.status_code, 200)
        self.assertIn("access", res.data)
        self.assertIn("refresh", res.data)
    
    def test_can_login(self):
        guest = self.create_guest()
        self.client = APIClient()
        url = reverse("login-guest")

        res = self.client.post(url, {
            "email": "test@mail.com",
            "password": "password123",
        }, format="json")

        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data["user"]["id"], guest.id)
