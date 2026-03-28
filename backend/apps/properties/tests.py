from django.test import TestCase
from apps.owners.models import *
from apps.bookings.models import *
from apps.properties.models import *

# from django.contrib.auth.models import User
from rest_framework.test import APIClient
from django.urls import reverse

from apps.owners.tests import OwnerModelTest

# Create your tests here.

class PropertyModelTest(TestCase):

    def create_property(self, owner=None):
        if owner is None:
            # owner = OwnerModelTest.create_owner(self, owner=None)
            owner = Owner.objects.create(
                user=User.objects.create(username="owner1", password="123")
            )

        property = Property.objects.create(
            owner=owner,
            title="test property",
            description="test description",
            location="test location",
            price_per_night=100,
        )
        return property

    def test_can_create_property(self):
        OwnerModelTest.create_owner(self)
        access = OwnerModelTest.get_token(self)

        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION=f"Bearer {access}")

        url = reverse("properties")

        res = client.post(url, {
            "title": "my property",
            "description": "my description",
            "location": "toronto",
            "price_per_night": 100,
        }, format="json")

        self.assertEqual(res.status_code, 201)
        self.assertEqual("my property", res.data["title"])
