from rest_framework.test import APIClient
from testing.testcases import TestCase

from society.constants import SocietyType, SocietyStatus
# from society_manage.models import CreditReceivers
from society.models import Society


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
            name='jeek',
            members=None,
            society_type=SocietyType.HUMANISTIC
        )
        self.society2 = self.createSociety(
            user=self.user2,
            society_id=301,
            name='jeek2',
            members=None,
            society_type=SocietyType.SCIENTIFIC,
            status=SocietyStatus.ARCHIVED
        )
        self.society3 = self.createSociety(
            user=self.user3,
            society_id=501,
            name='jtv',
            members=None,
            society_type=SocietyType.LEADERSHIP,
            status=SocietyStatus.ACTIVE
        )
        self.society_bureau = self.createSocietyBureau(user=self.user4, real_name='xxx')

    def test_retrieve_society(self):
        url = '/api/manage/society/{}/'.format(self.society2.pk)

        client = APIClient(enforce_csrf_checks=True)
        response = client.get(url, decode=True)
        self.assertEqual(response.status_code, 403)

        client.force_authenticate(self.user4)
        response = client.get(url, decode=True)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['society_id'], 301)
        self.assertEqual(response.data['name'], 'jeek2')
        self.assertEqual(response.data['type'], SocietyType.SCIENTIFIC)

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
            'status': SocietyStatus.ACTIVE
        }
        response = client.get(url, data=data, decode=True)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'jtv')

    def test_confirm_society(self):
        url = '/api/manage/society/{}/confirm/'.format(self.society3.pk)
        data = {
            'id': self.society3.pk,
            'society_id': 401
        }
        client = APIClient(enforce_csrf_checks=True)
        response = client.post(url, data=data, decode=True)
        self.assertEqual(response.status_code, 403)

        client.force_authenticate(self.user4)
        response = client.post(url, data=data, decode=True)
        self.assertEqual(response.status_code, 403)

        url = '/api/manage/society/{}/confirm/'.format(self.society1.pk)
        data = {
            'id': self.society1.pk,
            'society_id': 301
        }
        response = client.post(url, data=data, decode=True)
        self.assertEqual(response.status_code, 400)

        data = {
            'id': self.society1.pk,
            'society_id': ''
        }
        response = client.post(url, data=data, decode=True)
        self.assertEqual(response.status_code, 202)
        self.society1.refresh_from_db()
        self.assertEqual(self.society1.society_id, 401)
        self.assertEqual(self.society1.status, SocietyStatus.ACTIVE)

    def test_archive_society(self):
        url = '/api/manage/society/{}/archive/'.format(self.society1.pk)

        client = APIClient(enforce_csrf_checks=True)
        response = client.post(url, decode=True)
        self.assertEqual(response.status_code, 403)

        # test with a waiting society
        url = '/api/manage/society/{}/archive/'.format(self.society1.pk)
        client.force_authenticate(self.user4)
        response = client.post(url, decode=True)
        self.assertEqual(response.status_code, 403)

        url = '/api/manage/society/{}/archive/'.format(self.society3.pk)
        response = client.post(url, decode=True)
        self.society3.refresh_from_db()
        self.assertEqual(response.status_code, 202)
        self.assertEqual(self.society3.status, SocietyStatus.ARCHIVED)
        self.assertEqual(self.society3.user.is_active, False)

    def test_destroy_society(self):
        url = '/api/manage/society/{}/'.format(self.society3.pk)

        client = APIClient(enforce_csrf_checks=True)
        response = client.delete(url, decode=True)
        self.assertEqual(response.status_code, 403)

        # test with an active society
        client.force_authenticate(self.user4)
        response = client.delete(url, decode=True)
        self.assertEqual(response.status_code, 403)

        url = '/api/manage/society/{}/'.format(self.society2.pk)
        response = client.delete(url, decode=True)
        self.assertEqual(response.status_code, 204)
        self.assertIsNone(Society.objects.filter(pk=self.society2.pk).first())


class CreditManageTests(TestCase):
    def setUp(self):
        self.user1 = self.createUser('society1')
        self.user2 = self.createUser('society2')
        self.user3 = self.createUser('society_bureau')
        self.society1 = self.createSociety(
            user=self.user1,
            society_id=301,
            name='jeek',
            members=None,
            society_type=SocietyType.SCIENTIFIC,
            status=SocietyStatus.ACTIVE
        )
        self.society2 = self.createSociety(
            user=self.user2,
            society_id=401,
            name='jtv',
            members=None,
            society_type=SocietyType.HUMANISTIC,
            status=SocietyStatus.ACTIVE
        )
        self.society_bureau = self.createSocietyBureau(user=self.user3, real_name='xxx')


# class CreditReceiversTests(TestCase):
#     def setUp(self):
#         self.user1 = self.createUser('society1')
#         self.user2 = self.createUser('society2')
#         self.user3 = self.createUser('society_bureau')
#         self.user4 = self.createUser('student')
#         self.society1 = self.createSociety(
#             user=self.user1,
#             society_id=401,
#             name='jeek',
#             members=None,
#             society_type=SocietyType.HUMANISTIC
#         )
#         self.society2 = self.createSociety(
#             user=self.user2,
#             society_id=301,
#             name='jtv',
#             members=None,
#             society_type=SocietyType.SCIENTIFIC
#         )
#         self.society_bureau = self.createSocietyBureau(user=self.user3, real_name='xxx')
#         self.credit_receivers1 = CreditReceivers.objects.create(
#             society=self.society1,
#             year=2018,
#             semester=2
#         )
#         self.credit_receivers2 = CreditReceivers.objects.create(
#             society=self.society2,
#             year=2018,
#             semester=1
#         )
#         self.credit_receivers3 = CreditReceivers.objects.create(
#             society=self.society2,
#             year=2017,
#             semester=1
#         )
#         self.student = self.createStudent(user=self.user4)
#         self.credit_receivers1.receivers.add(self.student)
#         self.credit_receivers2.receivers.add(self.student)
#
#     def test_list_credit_receivers(self):
#         url = '/api/manage/credit_receiver/'
#
#         client = APIClient(enforce_csrf_checks=True)
#         response = client.get(url, decode=True)
#         self.assertEqual(response.status_code, 403)
#
#         client.force_authenticate(self.user3)
#         response = client.get(url, decode=True)
#         self.assertEqual(response.status_code, 200)
#         self.assertEqual(len(response.data), 3)
#
#         response = client.get(url, data={'name': 'jtv'}, decode=True)
#         self.assertEqual(response.status_code, 200)
#         self.assertEqual(len(response.data), 2)
#         self.assertEqual(response.data[0]['society']['society_id'], 301)
#         self.assertEqual(response.data[1]['society']['society_id'], 301)
#         self.assertEqual(response.data[0]['count'], 1)
#         self.assertEqual(response.data[1]['count'], 0)
#
#         data = {
#             'year': 2018,
#             'semester': 1
#         }
#         response = client.get(url, data=data, decode=True)
#         self.assertEqual(response.status_code, 200)
#         self.assertEqual(len(response.data), 1)
#         self.assertEqual(response.data[0]['society']['society_id'], 301)
#
#     def test_retrieve_credit_receivers(self):
#         url = '/api/manage/credit_receiver/{}/'.format(self.credit_receivers1.pk)
#
#         client = APIClient(enforce_csrf_checks=True)
#         response = client.get(url, decode=True)
#         self.assertEqual(response.status_code, 403)
#
#         client.force_authenticate(self.user3)
#         response = client.get(url, decode=True)
#         self.assertEqual(response.data['society']['society_id'], self.society1.society_id)
#         self.assertEqual(response.data['year'], self.credit_receivers1.year)
#         self.assertEqual(response.data['semester'], self.credit_receivers1.semester)
#         self.assertEqual(len(response.data['receivers']), 1)
#         self.assertEqual(response.data['receivers'][0]['name'], 'ncjjj')
