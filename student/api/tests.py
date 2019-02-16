from rest_framework.test import APIClient

from testing.testcases import TestCase
from society_manage.models import CreditDistribution

class StudentTests(TestCase):
    def test_get_student(self):
        user = self.createUser(username='ncj')
        student = self.createStudent(user=user)
        url = '/api/student/{}/'.format(student.id)
        client = APIClient(enforce_csrf_checks=True)
        client.force_authenticate(user)
        response = client.get(url, decode=False)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['name'], student.name)
        self.assertEqual(response.data['grade'], student.grade)
        self.assertEqual(response.data['class_num'], student.class_num)

    def test_permission(self):
        user1 = self.createUser(username='ncj')
        student1 = self.createStudent(user=user1)
        user2 = self.createUser(username='ncj2')
        url = '/api/student/{}/'.format(student1.id)
        client = APIClient(enforce_csrf_checks=True)
        client.force_authenticate(user2)
        response = client.get(url, decode=False)
        self.assertEqual(response.status_code, 403)

    def test_object_permission(self):
        user1 = self.createUser(username='ncj')
        student1 = self.createStudent(user=user1)
        user2 = self.createUser(username='ncj2')
        student2 = self.createStudent(user=user2)
        url = '/api/student/{}/'.format(student1.id)
        client = APIClient(enforce_csrf_checks=True)
        client.force_authenticate(user2)
        response = client.get(url, decode=False)
        self.assertEqual(response.status_code, 403)

    def test_update_student_profile(self):
        user = self.createUser('qltnb')
        student = self.createStudent(user=user)
        url = '/api/student/{}/'.format(student.id)
        client = APIClient(enforce_csrf_checks=True)
        client.force_authenticate(user)
        data = {
            'class_num': '2',
            'grade': '3',
            'qq': '123',
            'name': '上科大龙田酱'
        }
        response = client.patch(url, data=data, decode=True)
        self.assertEqual(response.status_code, 200)
        student.refresh_from_db()
        self.assertEqual(student.class_num, 2)
        self.assertEqual(student.grade, 3)
        self.assertEqual(student.qq, '123')
        self.assertEqual(student.name, '上科大龙田酱')
        response = self.client.patch(url, data=data, decode=True)
        self.assertEqual(response.status_code, 403)


class StudentCreditTests(TestCase):
    def setUp(self):
        self.user1 = self.createUser('jw')
        self.student1 = self.createStudent(self.user1)

    def test_get_credit_distribution(self):
        url = '/api/student/credit/'

        client = APIClient(enforce_csrf_checks=True)
        client.force_authenticate(self.user1)

        res = client.get(url, decode=True)
        self.assertEqual(res.status_code, 200)

        user = self.createUser('society')
        society = self.createSociety(user, members=None)
        credit_distribution = CreditDistribution.objects.create(
            society=society,
            year=2019,
            semester=1
        )
        credit_distribution.receivers.add(self.student1)

        credit_distribution2 = CreditDistribution.objects.create(
            society=society,
            year=2019,
            semester=2
        )
        credit_distribution2.receivers.add(self.student1)

        res = client.get(url, decode=True)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data[0]['society']['name'], society.name)
        self.assertEqual(res.data[0]['semester'], credit_distribution.semester)
        self.assertEqual(res.data[0]['year'], credit_distribution.year)

        self.assertEqual(res.data[1]['year'], credit_distribution2.year)
