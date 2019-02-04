from rest_framework import routers

from account.views import AuthViewSet
from society.api.views import SocietyViewSet
from student.api.views import StudentViewSet
from society_manage.api.views import (
    SocietyMemberViewSet,
    JoinSocietyRequestViewSet
)

router = routers.SimpleRouter()

router.register(r'account', AuthViewSet, base_name='account')
router.register(r'society', SocietyViewSet, base_name='society')
router.register(r'student', StudentViewSet, base_name='student')
router.register(r'society_manage/member', SocietyMemberViewSet, base_name='society_manage_members')
router.register(r'society_manage/join_request', JoinSocietyRequestViewSet, base_name='society_manage_join_request')

urlpatterns = router.urls
