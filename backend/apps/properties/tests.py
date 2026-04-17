from django.test import TestCase
from apps.owners.models import *
from apps.bookings.models import *
from apps.properties.models import *

# from django.contrib.auth.models import User
from rest_framework.test import APIClient
from django.urls import reverse
from django.core.files.uploadedfile import SimpleUploadedFile
import json

from apps.owners.tests import OwnerModelTest

# Create your tests here.

class PropertyModelTest(TestCase):

    def test_can_create_property(self):
        OwnerModelTest.create_owner(self)
        access = OwnerModelTest.get_token(self)

        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION=f"Bearer {access}")

        url = reverse("add-property")

        image = SimpleUploadedFile(
            name="test.jpg",
            content=b"file_content",
            content_type="image/jpeg"
        )

        res = client.post(url, {
            "title": "my property",
            "description": "my description",
            "location": "toronto",
            "price_per_night": 100,
            "number_of_guests": 2,
            "rooms": 2,

            "amenities": json.dumps(['wifi', 'kitchen', 'parking']),
            "rooms_list": json.dumps([
                {"name": "Bedroom", "price_per_night": 80}
            ]),
            "images": image
        }, format="multipart")

        self.assertEqual(res.status_code, 201)
        self.assertEqual("my property", res.data['data']['title'])
