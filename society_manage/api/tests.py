from rest_framework.test import APIClient
from testing.testcases import TestCase

from society.constants import SocietyType


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
        url = '/api/society_manage/members/kick/'
        data = {
            'member_id': self.student.id
        }
        client = APIClient(enforce_csrf_checks=True)
        client.force_authenticate(self.user1)
        response = self.client.post(url)
        self.assertEqual(response)

