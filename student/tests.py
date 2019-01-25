from django.test import TestCase
from student.models import Student
from django.contrib.auth.models import User


# Create your tests here.

class StudentTestCase(TestCase):
    def setUp(self):
        User.objects.create_user(username='test_user')

    def test_create_student(self):
        user = User.objects.get(username='test_user')
        student = Student.objects.create(
            user=user,
            name='sms',
            grade=-4,
            class_num=1,
            qq='123456789'
        )
        self.assertIsNotNone(student)
        self.assertIsInstance(student, Student)
