from django.test import TestCase as DjangoTestCase
from django.contrib.auth.models import User

from society.constants import SocietyType, SocietyStatus
from testing.client import Client

from student.models import Student
from society.models import Society
from society_bureau.models import SocietyBureau


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

    def createSociety(
            self,
            user,
            members=None,
            society_id=None,
            status=SocietyStatus.WAITING,
            society_type=SocietyType.HUMANISTIC,
            name='jeek1',
            president_name='ncj',
            president_class=1,
            president_grade=1
    ):
        society = Society.objects.create(
            user=user,
            society_id=society_id,
            president_name=president_name,
            president_class=president_class,
            president_grade=president_grade,
            type=society_type,
            name=name,
            status=status
        )
        if members is not None:
            society.members.set(members)
        return society

    def createSocietyBureau(
            self,
            user,
            real_name='qsm',
            qq='2333',
            email='ncj19991213@126.com',
    ):
        society_bureau = SocietyBureau.objects.create(
            user=user,
            real_name=real_name,
            qq=qq,
            email=email
        )
        return society_bureau
