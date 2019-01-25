from django.test import TestCase as DjangoTestCase
from testing.client import Client


class TestCase(DjangoTestCase):
    client_class = Client
