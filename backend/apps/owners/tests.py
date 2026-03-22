from django.test import TestCase
from apps.owners.models import Owner

# Create your tests here.

# is there any models in owners and is there any if exists
class OwnerModelTest(TestCase): 
    def test_owner_model_exists(self):
        owners = Owner.objects.count() # get all owners

        self.assertEqual(owners, 0) # if equal to 0 return True
