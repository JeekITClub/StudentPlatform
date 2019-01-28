from django.test import TestCase as DjangoTestCase
from django.contrib.auth.models import User
from testing.client import Client

from student.models import Student


class TestCase(DjangoTestCase):
    client_class = Client

    def createUser(self, username):
        return User.objects.create_user(username=username, password=username + 'ncjnb')

    def createStudent(
            self,
            user,
            name='ncjjj',
            grade=1,
            class_num=1,
            qq='123'
    ):
        return Student.objects.create(
            user=user,
            name=name,
            grade=grade,
            class_num=class_num,
            qq=qq
        )
