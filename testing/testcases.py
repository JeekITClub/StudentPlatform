from django.test import TestCase as DjangoTestCase
from django.contrib.auth.models import User
from testing.client import Client


class TestCase(DjangoTestCase):
    client_class = Client

    def createUser(self, username, password='chickendinner'):
        return User.objects.create_user(username=username, password=password)
