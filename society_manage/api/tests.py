from rest_framework.test import APIClient
from testing.testcases import TestCase

from society.constants import SocietyType, JoinSocietyRequestStatus
from society.models import JoinSocietyRequest


class SocietyManageMemberTests(TestCase):
    def setUp(self):
        self.user1 = self.createUser('society1')
        self.society = self.createSociety(
            user=self.user1,
            society_id=101,
            members=None,
            society_type=SocietyType.HUMANISTIC
        )
        self.user2 = self.createUser(
            username='student'
        )
        self.student = self.createStudent(
            user=self.user2
        )

    def test_kick_member(self):
        url = '/api/society_manage/member/kick/'
        data = {
            'member_id': self.student.id
        }
        client = APIClient(enforce_csrf_checks=True)
        client.force_authenticate(self.user1)
        response = client.post(url, data=data, decode=True)
        self.assertEqual(response.status_code, 400)

        self.society.members.add(self.student)
        response = client.post(url, data=data, decode=True)
        self.assertEqual(response.status_code, 202)

        data = {
            'hello': 'ncjnb'
        }
        response = client.post(url, data=data, decode=True)
        self.assertEqual(response.status_code, 400)

        response = self.client.post(url, data=data)
        self.assertEqual(response.status_code, 403)


class SocietyManageJoinRequestTests(TestCase):
    def setUp(self):
        self.student_user1 = self.createUser(
            'ncj1'
        )
        self.student1 = self.createStudent(
            user=self.student_user1
        )
        self.student_user2 = self.createUser(
            'ncj2'
        )
        self.student2 = self.createStudent(
            user=self.student_user2
        )
        self.society_user = self.createUser(
            username='101'
        )
        self.society = self.createSociety(
            user=self.society_user,
            members=None,
            society_id=101,
            society_type=SocietyType.HUMANISTIC
        )
        self.jr1 = JoinSocietyRequest.objects.create(
            society=self.society,
            member=self.student1,
            status=JoinSocietyRequestStatus.ACCEPTED
        )
        self.jr2 = JoinSocietyRequest.objects.create(
            society=self.society,
            member=self.student2
        )

    def test_list_join_requests(self):
        url = '/api/society_manage/join_request/'

        client = APIClient(enforce_csrf_checks=True)
        client.force_authenticate(self.society_user)
        response = client.get(url, decode=True)
        self.assertEqual(response.data[0]['member']['name'], self.student1.name)
        self.assertEqual(response.data[1]['member']['class_num'], self.student2.class_num)

        data = {
            'status': JoinSocietyRequestStatus.ACCEPTED
        }
        response = client.get(url, data=data, decode=True)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['member']['grade'], self.student1.grade)

        data = {
            'status': JoinSocietyRequestStatus.WAITING
        }
        response = client.get(url, data=data, decode=True)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['member']['grade'], self.student2.grade)

        response = self.client.get(url)
        self.assertEqual(response.status_code, 403)
