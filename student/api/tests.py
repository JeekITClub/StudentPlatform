from rest_framework.test import APIClient

from testing.testcases import TestCase


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

    def test_change_password(self):
        user = self.createUser(username='ncj')
        student = self.createStudent(user=user)
        data = {
            'old_password': 'ncjncjnb',
            'new_password': 'ncj233'
        }
        url = '/api/student/change_password/'
        client = APIClient(enforce_csrf_checks=True)
        client.force_authenticate(user)
        response = client.post(url, data=data, decode=False)
        self.assertEqual(response.status_code, 202)

    def test_change_password_with_incorrect_old_password(self):
        user = self.createUser(username='ncj')
        student = self.createStudent(user=user)
        data = {
            'old_password': 'ncjnb',
            'new_password': 'ncj233'
        }
        url = '/api/student/change_password/'
        client = APIClient(enforce_csrf_checks=True)
        client.force_authenticate(user)
        response = client.post(url, data=data, decode=False)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data['detail'], '原密码错误')

    def test_change_password_with_invalid_form(self):
        user = self.createUser(username='ncj')
        student = self.createStudent(user=user)
        data = {
            'old_password23': 'ncjnb',
            'new_password1': 'ncj233'
        }
        url = '/api/student/change_password/'
        client = APIClient(enforce_csrf_checks=True)
        client.force_authenticate(user)
        response = client.post(url, data=data, decode=False)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data['detail'], '表单填写错误')

    def test_change_password_with_wrong_method(self):
        user = self.createUser(username='ncj')
        student = self.createStudent(user=user)
        data = {
            'old_password23': 'ncjnb',
            'new_password1': 'ncj233'
        }
        url = '/api/student/change_password/'
        client = APIClient(enforce_csrf_checks=True)
        client.force_authenticate(user)
        response = client.get(url, data=data, decode=False)
        self.assertEqual(response.status_code, 405)
