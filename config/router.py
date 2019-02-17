from rest_framework import routers

from account.views import AccountViewSet
from society.api.views import SocietyViewSet
from student.api.views import (
    StudentViewSet,
    StudentCreditViewSet
)
from society_manage.api.views import (
    SocietyMemberViewSet,
    JoinSocietyRequestViewSet,
    ActivityRequestViewSet,
    SocietyCreditViewSet
)
from society_bureau.api.views import (
    DashboardViewSet,
    SocietyManageViewSet,
    CreditManageViewSet
)

router = routers.SimpleRouter()

router.register(r'account', AccountViewSet, base_name='account')
router.register(r'society', SocietyViewSet, base_name='society')
router.register(r'student/credit', StudentCreditViewSet, base_name='student_credit')
router.register(r'student', StudentViewSet, base_name='student')
router.register(r'society_manage/member', SocietyMemberViewSet, base_name='society_manage_members')
router.register(r'society_manage/join_request', JoinSocietyRequestViewSet, base_name='society_manage_join_request')
router.register(r'society_manage/activity', ActivityRequestViewSet, base_name='society_manage_join_request')
router.register(r'society_manage/credit', SocietyCreditViewSet, base_name='society_manage_credit')
router.register(r'manage/dashboard', DashboardViewSet, base_name='society_bureau_dashboard')
router.register(r'manage/society', SocietyManageViewSet, base_name='society_bureau_society')
router.register(r'manage/credit', CreditManageViewSet, base_name='society_bureau_credit')

urlpatterns = router.urls
