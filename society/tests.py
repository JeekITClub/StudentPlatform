from django.test import TestCase
from student.models import Student
from society.models import Society, SocietyMemberRelationShip
from society.constants import MemberConfirmStatus
from django.contrib.auth.models import User


# Create your tests here.

class SocietyTestCase(TestCase):
    def setUp(self):
        user = User.objects.create_user(username='20151333', password='student')
        Student.objects.create(
            user=user,
            name='sms',
            grade=1,
            class_num=1,
            qq='123456789'
        )
        user = User.objects.create_user(username='101', password='society')
        Society.objects.create(
            society_id=101,
            user=user,
            name='Jeek',
            confirmed=True,
            recruit=True,
            president_grade=1,
            president_class=1,
            type=1
        )

    def test_can_make_application(self):
        student = Student.objects.get(user__username='20151333')
        society = Society.objects.get(name='Jeek')
        relation = SocietyMemberRelationShip.objects.create(society=society, member=student)
        self.assertEqual(relation.status, MemberConfirmStatus.WAITING)
        self.assertIn(student, society.members.all())
        self.assertIn(society, student.society_set.all())

    # def test_can_accept_member(self):
    #     pass

    # def test_can_deny_member(self):
    #     pass
