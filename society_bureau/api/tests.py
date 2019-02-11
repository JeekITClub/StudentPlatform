from rest_framework.test import APIClient
from testing.testcases import TestCase

from society.constants import SocietyType
from society.models import ActivityRequest
# from society_manage.models import CreditReceivers


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
            society_type=SocietyType.SCIENTIFIC
        )
        self.society2 = self.createSociety(
            user=self.user2,
            society_id=401,
            name='jtv',
            members=None,
            society_type=SocietyType.HUMANISTIC
        )
        self.society_bureau = self.createSocietyBureau(user=self.user3, real_name='xxx')

    def test_list_societies_credit(self):
        url = '/api/manage/credit/'

        client = APIClient(enforce_csrf_checks=True)
        response = client.get(url, decode=True)
        self.assertEqual(response.status_code, 403)

        client.force_authenticate(self.user3)
        response = client.get(url, decode=True)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]['credit'], 0)

    def test_update_society_credit(self):
        url = '/api/manage/credit/{}/'.format(self.society1.pk)
        data = {
            'credit': 15
        }

        client = APIClient(enforce_csrf_checks=True)
        response = client.put(url, data=data, decode=True)
        self.assertEqual(response.status_code, 403)

        client.force_authenticate(self.user3)
        response = client.put(url, data=data, decode=True)
        self.assertEqual(response.status_code, 200)
        self.society1.refresh_from_db()
        self.assertEqual(self.society1.credit, 15)

    def test_set_all_credit(self):
        url = '/api/manage/credit/set_all/'
        data = {
            'credit': -10
        }

        client = APIClient(enforce_csrf_checks=True)
        response = client.post(url, data=data, decode=True)
        self.assertEqual(response.status_code, 403)

        client.force_authenticate(self.user3)
        response = client.post(url, data=data, decode=True)
        self.assertEqual(response.status_code, 400)

        data = {
            'credit': 10
        }
        response = client.post(url, data=data, decode=True)
        self.society1.refresh_from_db()
        self.society2.refresh_from_db()
        self.assertEqual(response.status_code, 202)
        self.assertEqual(self.society1.credit, 10)
        self.assertEqual(self.society2.credit, 10)

#
# class CreditReceiversTests(TestCase):
#     def setUp(self):
#         self.user1 = self.createUser('society1')
#         self.user2 = self.createUser('society2')
#         self.user3 = self.createUser('society_bureau')
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
#         response = client.get(url, data={'name': 'jee'}, decode=True)
#         self.assertEqual(response.status_code, 200)
#         self.assertEqual(response.data[0]['society']['id'], 1)
#         data = {
#             'year': 2018,
#             'semester': 1
#         }
#         response = client.get(url, data=data, decode=True)
#         self.assertEqual(response.status_code, 200)
#         self.assertEqual(len(response.data), 1)
#         self.assertEqual(response.data[0]['society']['id'], 2)
#
#     def test_retrieve_credit_receivers(self):
#         pass
#         # TODO: leave it to next pr
