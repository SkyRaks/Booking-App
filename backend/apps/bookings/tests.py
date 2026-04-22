from django.test import TestCase
from django.contrib.auth.models import User
from django.urls import reverse

from rest_framework.test import APIClient

from apps.owners.models import *
from apps.bookings.models import *
from apps.properties.models import *
from apps.guests.models import *

# from apps.guests.tests import GuestModelTest
# from apps.owners.tests import OwnerModelTest
# from apps.properties.tests import PropertyModelTest

# Create your tests here.

class BookingModelTest(TestCase):
    def create_guest(self):
        user = User.objects.create_user(username="oliver", password="password123")
        return user
    
    def get_token(self):
        client = APIClient()
        url = reverse("token_obtain_pair")

        res = client.post(url, {
            "username": "oliver",
            "password": "password123",
        }, format="json")

        return res.data["access"]

    def create_property(self, owner):
        property = Property.objects.create(
            owner=owner,
            title="test property",
            description="test description",
            location="test location",
            price_per_night=100,
        )
        return property

    # def test_booking_property(self):
    #     user = self.create_guest()
    #     access = self.get_token()

    #     owner = Owner.objects.create(user=user)
    #     property = self.create_property(owner=owner)

    #     client = APIClient()
    #     client.credentials(HTTP_AUTHORIZATION=f"Bearer {access}")

    #     url = reverse("create-booking")

    #     res = client.post(url, {
    #         "property": property.id,
    #         "start_date": "2026-01-10",
    #         "end_date": "2026-01-12"
    #     }, format="json")

    #     self.assertEqual(res.status_code, 201)
    #     self.assertIn("id", res.data)
