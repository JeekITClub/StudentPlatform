from rest_framework import routers

from account.views import AccountViewSet
from society.api.views import SocietyViewSet
from student.api.views import StudentViewSet
from society_manage.api.views import (
    SocietyMemberViewSet,
    JoinSocietyRequestViewSet,
    ActivityRequestViewSet
)
from society_bureau.api.views import (
    DashboardViewSet,
    SocietyManageViewSet,
    CreditManageViewSet,
    CreditReceiversViewSet
)

router = routers.SimpleRouter()

router.register(r'account', AccountViewSet, base_name='account')
router.register(r'society', SocietyViewSet, base_name='society')
router.register(r'student', StudentViewSet, base_name='student')
router.register(r'society_manage/member', SocietyMemberViewSet, base_name='society_manage_members')
router.register(r'society_manage/join_request', JoinSocietyRequestViewSet, base_name='society_manage_join_request')
router.register(r'society_manage/activity', ActivityRequestViewSet, base_name='society_manage_join_request')
router.register(r'manage/dashborad', DashboardViewSet, base_name='society_bureau_dashborad')
router.register(r'manage/society', SocietyManageViewSet, base_name='society_bureau_society')
router.register(r'manage/credit', CreditManageViewSet, base_name='society_bureau_credit')
router.register(r'manage/credit_receiver', CreditReceiversViewSet, base_name='society_bureau_credit_receiver')

urlpatterns = router.urls
