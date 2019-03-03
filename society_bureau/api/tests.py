from rest_framework.test import APIClient
from testing.testcases import TestCase

from society.constants import SocietyType, SocietyStatus
from society_manage.models import CreditDistribution
from society.models import Society
from society_bureau.api.services import SettingsService


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
        self.assertEqual(len(response.data['results']), 3)

        data = {
            'name': 'jee'
        }
        response = client.get(url, data=data, decode=True)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data['results']), 2)

        data = {
            'type': SocietyType.LEADERSHIP
        }
        response = client.get(url, data=data, decode=True)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['name'], 'jtv')

        data = {
            'status': SocietyStatus.ACTIVE
        }
        response = client.get(url, data=data, decode=True)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['name'], 'jtv')

    def test_list_pagination_societies(self):
        users = [self.createUser('society{}'.format(i)) for i in range(4, 51)]
        societies = [
            self.createSociety(
                user=user,
                society_id=user.id - 1,
                name=user.username,
                members=None
            ) for user in users
        ]
        url = '/api/manage/society/'
        data = {
            'page': 2,
            'page_size': 20
        }

        client = APIClient(enforce_csrf_checks=True)
        response = client.get(url, decode=True)
        self.assertEqual(response.status_code, 403)

        # default page_size = 10
        client.force_authenticate(self.user4)
        response = client.get(url, decode=True)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data['results']), 10)
        self.assertEqual(response.data['results'][0]['id'], 1)

        # set page and page_size manually
        response = client.get(url, data=data, decode=True)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data['results']), 20)
        self.assertEqual(response.data['results'][0]['id'], 21)

        # max page_size = 50
        data = {
            'page': 1,
            'page_size': 50
        }
        response = client.get(url, data=data, decode=True)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data['results']), 40)
        self.assertEqual(response.data['count'], 50)
        self.assertEqual(response.data['results'][-1]['id'], 40)

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
        credit = CreditDistribution.objects.create(
            society=self.society3,
            year=SettingsService.get('year'),
            semester=SettingsService.get('semester'),
            credit=10,
            closed=False
        )
        student_user = self.createUser('student')
        student = self.createStudent(user=student_user)
        credit.receivers.add(student)
        self.society3.members.add(student)
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
        self.assertIsNone(self.society3.society_id)
        self.assertEqual(self.society3.status, SocietyStatus.ARCHIVED)
        self.assertEqual(self.society3.user.is_active, False)
        self.assertNotIn(student, self.society3.members.all())
        self.assertNotIn(student, credit.receivers.all())

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


class CreditReceiversTests(TestCase):
    def setUp(self):
        self.user1 = self.createUser('society1')
        self.user2 = self.createUser('society2')
        self.user3 = self.createUser('society_bureau')
        self.user4 = self.createUser('student')
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
            name='jtv',
            members=None,
            society_type=SocietyType.SCIENTIFIC
        )
        self.society_bureau = self.createSocietyBureau(user=self.user3, real_name='xxx')
        self.student = self.createStudent(user=self.user4)

    def test_list_credit_distributions(self):
        url = '/api/manage/credit/?year={year}&semester={semester}'.format(
            year=SettingsService.get('year'),
            semester=SettingsService.get('semester')
        )

        # test permissions
        client = APIClient(enforce_csrf_checks=True)
        response = client.get(url, decode=True)
        self.assertEqual(response.status_code, 403)

        # now there is no credit distribution
        # so the credit distribution will be generated automatically
        client.force_authenticate(self.user3)
        response = client.get(url, decode=True)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data['results']), 2)
        self.assertEqual(response.data['results'][0]['receivers_count'], 0)
        self.assertEqual(response.data['results'][0]['credit'], 1)
        self.assertEqual(CreditDistribution.objects.count(), 2)

        # now there are credit distributions
        # so response the existing data
        response = client.get(url, decode=True)
        self.assertEqual(len(response.data['results']), 2)

        # the following code is just a test
        # we should try our best to avoid this situation
        CreditDistribution.objects.first().delete()
        # response the existing credit distribution
        response = client.get(url, decode=True)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data['results']), 1)

        url = '/api/manage/credit/?year={year}&semester={semester}'.format(
            year=SettingsService.get('year') - 1,
            semester=2
        )
        client.get(url)
        self.assertEqual(CreditDistribution.objects.filter(
            year=SettingsService.get('year') - 1,
            semester=2
        ).count(), 2)

        url = '/api/manage/credit/?year={year}&semester={semester}'.format(
            year=SettingsService.get('year'),
            semester=SettingsService.get('semester') + 1
        )
        res = client.get(url)
        self.assertEqual(res.status_code, 404)

        url = '/api/manage/credit/?year={year}&semester={semester}'.format(
            year=SettingsService.get('year') + 1110,
            semester=2
        )
        client.get(url)
        self.assertEqual(CreditDistribution.objects.filter(
            year=SettingsService.get('year') + 1110,
            semester=2
        ).count(), 0)

    def test_retrieve_credit_distribution(self):
        credit_distribution = CreditDistribution.objects.create(
            society=self.society1,
            year=2019,
            semester=1,
        )

        credit_distribution.receivers.add(self.student)

        url = '/api/manage/credit/{}/'.format(credit_distribution.pk)

        client = APIClient(enforce_csrf_checks=True)
        response = client.get(url, decode=True)
        self.assertEqual(response.status_code, 403)

        client.force_authenticate(self.user3)
        response = client.get(url, decode=True)
        self.assertEqual(response.data['society']['society_id'], self.society1.society_id)
        self.assertEqual(response.data['year'], credit_distribution.year)
        self.assertEqual(response.data['semester'], credit_distribution.semester)
        self.assertEqual(len(response.data['receivers']), 1)
        self.assertEqual(response.data['receivers'][0]['name'], self.student.name)

    def test_create_credit_distribution(self):
        url = '/api/manage/credit/'
        data = {
            'society_id': 401,
            'credit': 5
        }

        client = APIClient(enforce_csrf_checks=True)
        client.force_authenticate(self.user3)
        response = client.post(url, data=data, decode=True)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['credit'], 5)

    def test_update_credit_distribution(self):
        cd = CreditDistribution.objects.create(
            society=self.society1,
            year=2017,
            semester=1
        )
        url = '/api/manage/credit/{}/'.format(cd.pk)
        data = {
            'closed': True,
            'credit': 10
        }
        client = APIClient(enforce_csrf_checks=True)
        client.force_authenticate(self.user3)
        res = client.patch(url, data=data, decode=True)
        self.assertEqual(res.status_code, 200)
        cd.refresh_from_db()
        self.assertEqual(cd.closed, True)
        self.assertEqual(cd.credit, 10)


class SiteSettingsTest(TestCase):
    def setUp(self):
        self.user = self.createUser('sb1')
        self.createSocietyBureau(user=self.user)
        client = APIClient(enforce_csrf_checks=True)
        client.force_authenticate(self.user)
        self.client = client

    def test_retrieve(self):
        url = '/api/manage/settings/'

        res = self.client.get(url, encode=True)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data['year'], SettingsService.get('year'))
        self.assertEqual(res.data['semester'], SettingsService.get('semester'))

    def test_update(self):
        url = '/api/manage/settings/'
        res = self.client.put(url, data={'year': 2011, 'semester': 2})
        self.assertEqual(res.status_code, 202)

        res = self.client.put(url, data={'yea': 2011, 'semester': 2})
        self.assertEqual(res.status_code, 400)
