from rest_framework.test import APIClient

from testing.testcases import TestCase


# Create your tests here.

class AccountTests(TestCase):
    def setUp(self):
        self.user = self.createUser('ncjxjj')

    def test_login(self):
        url = '/api/account/login/'
        data = {
            'username': 'ncjxjj',
            'password': 'ncjxjjncjnb'
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 200)

        data = {
            'username123': 'ncjxjadaj',
            'passwo123rd': 'ncjxjjncjnb'
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 400)

        data = {
            'username': 'ncjdjj',
            'password': 'ncjxjjncjnb'
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 406)

    def test_logout(self):
        url = '/api/account/logout/'
        client = APIClient(enforce_csrf_checks=True)
        client.force_authenticate(self.user)
        response = client.post(url)
        self.assertEqual(response.status_code, 200)
