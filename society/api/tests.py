import json

from society.constants import SocietyType
from testing.testcases import TestCase

from society.models import Society


class SocietyTest(TestCase):
    def setUp(self):
        society_user_1 = self.createUser(username='ncjnb')
        self.society1 = Society.objects.create(
            user=society_user_1,
            society_id=101,
            name='社团',
            president_name='ncj',
            president_grade=1,
            president_class=1,
            president_qq=77777,
            type=SocietyType.HUMANISTIC,
            confirmed=True
        )
        society_user_2 = self.createUser(username='ncjcb')
        self.society2 = Society.objects.create(
            user=society_user_2,
            society_id=102,
            name='社团2',
            president_name='ncj2',
            president_grade=3,
            president_class=1,
            president_qq=6666,
            type=SocietyType.SELFRELIANCE,
            confirmed=True
        )

    def test_list_societies(self):
        url = '/api/society/'
        response = self.client.get(url, decode=False)
        self.assertEqual(response.data[0]['name'], self.society1.name)
        # 写不动了

    def test_get_society(self):
        url = '/api/society/{}/'.format(self.society1.pk)
        response = self.client.get(url, decode=False)
        self.assertEqual(response.data['name'], self.society1.name)
        # 写不动了
