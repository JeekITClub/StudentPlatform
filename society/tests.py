from django.test import TestCase
from student.models import Student
from society.models import Society
from society.constants import JoinSocietyRequestStatus
from django.contrib.auth.models import User


# Create your tests here.

class SocietyTestCase(TestCase):
    def setUp(self):
        user1 = User.objects.create_user(username='20151333')
        self.student = Student.objects.create(
            user=user1,
            name='sms',
            grade=1,
            class_num=1,
            qq='123456789'
        )
        user2 = User.objects.create_user(username='101')
        self.society1 = Society.objects.create(
            society_id=101,
            user=user2,
            name='Jeek',
            confirmed=True,
            recruit=True,
            president_grade=1,
            president_class=1,
            type=1
        )
        user3 = User.objects.create_user(username='102')
        self.society2 = Society.objects.create(
            society_id=102,
            user=user3,
            name='Jeek2',
            confirmed=True,
            recruit=True,
            president_grade=1,
            president_class=1,
            type=1
        )

    def test_get_society_list(self):
        url = '/api/society/'
        response = self.client.get(url)
        self.assertEqual(response.data[0]['name'], self.society1.name)
        self.assertEqual(response.data[0]['society_id'], self.society1.society_id)
        self.assertEqual(response.data[1]['name'], self.society2.name)
        self.assertEqual(response.data[1]['society_id'], self.society2.society_id)

    def test_search_societies(self):
        Society.objects.create(
            society_id=103,
            user=User.objects.create_user(username='test'),
            name='name',
            confirmed=True,
            recruit=True,
            president_grade=1,
            president_class=1,
            type=1
        )
        url = '/api/society/'
        params = {
            'name': 'Jeek'
        }
        response = self.client.get(url, data=params, decode=True)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]['name'], self.society1.name)
        self.assertEqual(response.data[1]['society_id'], self.society2.society_id)

    def test_join_society(self):
        url = '/api/society/1/join/'
        self.client.force_login(self.society1.user)
        response = self.client.post(url, decode=True)
        self.assertEqual(response.status_code, 401)

        # make first request
        self.client.force_login(self.student.user)
        response = self.client.post(url, decode=True)
        join_request = JoinSocietyRequest.objects.get(pk=1)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(join_request.member_id, self.student.id)
        self.assertEqual(join_request.society_id, self.society1.id)
        self.assertEqual(join_request.status, MemberConfirmStatus.WAITING)

        # send repeated request
        response = self.client.post(url, decode=True)
        self.assertEqual(response.status_code, 406)

        # send request after joining the society
        join_request.status = MemberConfirmStatus.ACCEPTED
        self.society1.members.add(self.student)
        response = self.client.post(url, decode=True)
        self.assertEqual(response.status_code, 406)

    # def test_can_accept_member(self):
    #     pass

    # def test_can_deny_member(self):
    #     pass
