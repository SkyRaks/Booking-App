from django.test import TestCase
from apps.owners.models import Owner
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from django.urls import reverse

# Create your tests here.

class OwnerModelTest(TestCase): 

    def test_owner_model_exists(self):
        owners = Owner.objects.count() # get all owners

        self.assertEqual(owners, 0) # if equal to 0 return 
    
    def test_can_create_owner(self):
        user = User.objects.create_user(username="oliver", password="password123")

        owner = Owner.objects.create(user=user)

        self.assertEqual(Owner.objects.count(), 1)
        self.assertEqual(owner.user.username, "oliver")
    
    def test_can_get_tokens(self):
        user = User.objects.create_user(username="oliver", password="password123")
        Owner.objects.create(user=user)

        client = APIClient()
        # token_obtain_pair
        url = reverse("token_obtain_pair")

        res = client.post(url, {
            "username": "oliver",
            "password": "password123",
        }, format="json")

        self.assertEqual(res.status_code, 200)
        self.assertIn("access", res.data)
        self.assertIn("refresh", res.data)
