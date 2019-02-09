from rest_framework.test import APIClient
from testing.testcases import TestCase

from society.constants import SocietyType, ActivityRequestStatus
from society.models import ActivityRequest
from society_manage.models import CreditReceivers
from society_bureau.models import SocietyBureau


class DashboardTests(TestCase):
    pass


class SocietyManageTests(TestCase):
    def setUp(self):
        self.user1 = self.createUser('society1')
        self.user2 = self.createUser('society2')
        self.user3 = self.createUser('society3')
        self.user4 = self.createUser('society_bureau')
        self.society1 = self.createSociety(
            user=self.user1,
            society_id=401,
            name='jeek',
            members=None,
            society_type=SocietyType.HUMANISTIC
        )
        self.society2 = self.createSociety(
            user=self.user2,
            society_id=301,
            name='jeek2',
            members=None,
            society_type=SocietyType.SCIENTIFIC
        )
        self.society3 = self.createSociety(
            user=self.user3,
            society_id=501,
            name='jtv',
            members=None,
            society_type=SocietyType.LEADERSHIP
        )
        self.society_bureau = self.createSocietyBureau(user=self.user4, real_name='xxx')

    def test_retrieve_society(self):
        url = '/api/manage/society/{}/'.format(self.society1.pk)

        client = APIClient(enforce_csrf_checks=True)
        response = client.get(url, decode=True)
        self.assertEqual(response.status_code, 403)

        client.force_authenticate(self.user4)
        response = client.get(url, decode=True)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['society_id'], 401)
        self.assertEqual(response.data['name'], 'jeek')
        self.assertEqual(response.data['type'], SocietyType.HUMANISTIC)

    def test_list_societies(self):
        url = '/api/manage/society/'

        client = APIClient(enforce_csrf_checks=True)
        response = client.get(url, decode=True)
        self.assertEqual(response.status_code, 403)

        client.force_authenticate(self.user4)
        response = client.get(url, decode=True)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 3)

        data = {
            'name': 'jee'
        }
        response = client.get(url, data=data, decode=True)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)

        data = {
            'type': SocietyType.LEADERSHIP
        }
        response = client.get(url, data=data, decode=True)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'jtv')

        data = {
            'name': 'jee',
            'type': SocietyType.SCIENTIFIC
        }
        response = client.get(url, data=data, decode=True)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'jeek2')

    def test_destroy_society(self):
        url = '/api/manage/society/{}/'.format(self.society1.pk)

        client = APIClient(enforce_csrf_checks=True)
        response = client.delete(url, decode=True)
        self.assertEqual(response.status_code, 403)

        client.force_authenticate(self.user4)
        response = client.delete(url, decode=True)
        self.assertEqual(response.status_code, 204)
        self.assertIsNone(ActivityRequest.objects.filter(pk=self.society1.pk).first())

# class SocietyManageJoinRequestTests(TestCase):
#     def setUp(self):
#         self.student_user1 = self.createUser(
#             'ncj1'
#         )
#         self.student1 = self.createStudent(
#             user=self.student_user1
#         )
#         self.student_user2 = self.createUser(
#             'ncj2'
#         )
#         self.student2 = self.createStudent(
#             user=self.student_user2
#         )
#         self.society_user = self.createUser(
#             username='101'
#         )
#         self.society = self.createSociety(
#             user=self.society_user,
#             members=None,
#             society_id=101,
#             society_type=SocietyType.HUMANISTIC
#         )
#         self.jr1 = JoinSocietyRequest.objects.create(
#             society=self.society,
#             member=self.student1,
#             status=JoinSocietyRequestStatus.ACCEPTED
#         )
#         self.jr2 = JoinSocietyRequest.objects.create(
#             society=self.society,
#             member=self.student2
#         )
#
#     def test_list_join_requests(self):
#         url = '/api/society_manage/join_request/'
#
#         client = APIClient(enforce_csrf_checks=True)
#         client.force_authenticate(self.society_user)
#         response = client.get(url, decode=True)
#         self.assertEqual(response.data[0]['member']['name'], self.student1.name)
#         self.assertEqual(response.data[1]['member']['class_num'], self.student2.class_num)
#
#         data = {
#             'status': JoinSocietyRequestStatus.ACCEPTED
#         }
#         response = client.get(url, data=data, decode=True)
#         self.assertEqual(len(response.data), 1)
#         self.assertEqual(response.data[0]['member']['grade'], self.student1.grade)
#
#         data = {
#             'status': JoinSocietyRequestStatus.WAITING
#         }
#         response = client.get(url, data=data, decode=True)
#         self.assertEqual(len(response.data), 1)
#         self.assertEqual(response.data[0]['member']['grade'], self.student2.grade)
#
#         response = self.client.get(url)
#         self.assertEqual(response.status_code, 403)
#
#     def test_update_join_request(self):
#         url = '/api/society_manage/join_request/{}/'.format(self.jr1.pk)
#         client = APIClient(enforce_csrf_checks=True)
#         client.force_authenticate(self.society_user)
#         data = {
#             'status': JoinSocietyRequestStatus.DENIED
#         }
#         response = client.put(url, data=data, decode=True)
#         self.assertEqual(response.status_code, 200)
#         self.jr1.refresh_from_db()
#         self.assertEqual(self.jr1.status, JoinSocietyRequestStatus.DENIED)
