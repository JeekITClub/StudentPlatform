from rest_framework.test import APIClient
from django.contrib.auth.models import User

from testing.testcases import TestCase
from student.models import Student
from society.models import Society, JoinSocietyRequest
from society.constants import JoinSocietyRequestStatus, SocietyStatus
from utils.permissions import (
    IsStudent,
    SingleJoinSocietyRequestCheck,
    JoinSociety,
    QuitSociety
)


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
            status=SocietyStatus.ACTIVE,
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
            status=SocietyStatus.ACTIVE,
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

    def test_get_society(self):
        url = '/api/society/{}/'.format(self.society1.pk)
        response = self.client.get(url, decode=False)
        self.assertEqual(response.data['name'], self.society1.name)
        self.assertEqual(response.data['type'], self.society1.type)

    def test_search_societies(self):
        Society.objects.create(
            society_id=103,
            user=User.objects.create_user(username='test'),
            name='name',
            status=SocietyStatus.ACTIVE,
            recruit=True,
            president_grade=1,
            president_class=1,
            type=1
        )
        url = '/api/society/'
        params = {
            'name': 'Jeek'
        }
        response = self.client.get(url, data=params)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]['name'], self.society1.name)
        self.assertEqual(response.data[1]['society_id'], self.society2.society_id)

    def test_join_society(self):
        url = '/api/society/{}/join/'.format(self.society1.pk)
        client = APIClient(enforce_csrf_checks=True)
        client.force_authenticate(self.society1.user)
        response = client.post(url)
        self.assertEqual(response.data['detail'], IsStudent.message)

        # make first request
        client.force_authenticate(self.student.user)
        response = client.post(url)
        self.assertEqual(response.status_code, 201)
        join_request = JoinSocietyRequest.objects.get(pk=1)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(join_request.member_id, self.student.id)
        self.assertEqual(join_request.society_id, self.society1.id)
        self.assertEqual(join_request.status, JoinSocietyRequestStatus.WAITING)

        # send repeated request
        response = client.post(url, decode=True)
        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.data['detail'], SingleJoinSocietyRequestCheck.message)

        # send request after joining the society
        join_request.status = JoinSocietyRequestStatus.ACCEPTED
        self.society1.members.add(self.student)
        response = client.post(url, decode=True)
        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.data['detail'], JoinSociety.message)

    def test_quit_society(self):
        url = '/api/society/{}/quit/'.format(self.society1.pk)
        client = APIClient(enforce_csrf_checks=True)
        self.society1.members.add(self.student)

        # identity check
        client.force_authenticate(self.society1.user)
        response = client.post(url)
        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.data['detail'], IsStudent.message)

        # quit successfully
        client.force_authenticate(self.student.user)
        response = client.post(url)
        self.society1.refresh_from_db()
        self.assertEqual(response.status_code, 200)
        self.assertNotIn(self.student, self.society1.members.all())

        # already quit
        response = client.post(url)
        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.data['detail'], QuitSociety.message)
