from rest_framework import routers

from account.views import AccountViewSet
from society.api.views import SocietyViewSet
from student.api.views import (
    StudentViewSet,
    StudentCreditViewSet,
    StudentSocietyViewSet,
    StudentActivityViewSet
)
from society_manage.api.views import (
    SocietyMemberViewSet,
    JoinSocietyRequestViewSet,
    ActivityRequestViewSet,
    SocietyCreditViewSet,
    SocietyProfileViewSet
)
from society_bureau.api.views import (
    DashboardViewSet,
    SocietyManageViewSet,
    CreditManageViewSet,
    SettingsViewSet
)

router = routers.SimpleRouter()

router.register(r'account', AccountViewSet, basename='account')
router.register(r'society', SocietyViewSet, basename='society')
router.register(r'activity', StudentActivityViewSet, basename='activity')
router.register(r'student/credit', StudentCreditViewSet, basename='student_credit')
router.register(r'student/society', StudentSocietyViewSet, basename='student_society')
router.register(r'student', StudentViewSet, basename='student')
router.register(r'society_manage/profile', SocietyProfileViewSet, basename='society_manage_profile')
router.register(r'society_manage/member', SocietyMemberViewSet, basename='society_manage_members')
router.register(r'society_manage/join_request', JoinSocietyRequestViewSet, basename='society_manage_join_request')
router.register(r'society_manage/activity', ActivityRequestViewSet, basename='society_manage_join_request')
router.register(r'society_manage/credit', SocietyCreditViewSet, basename='society_manage_credit')
router.register(r'manage/dashboard', DashboardViewSet, basename='society_bureau_dashboard')
router.register(r'manage/society', SocietyManageViewSet, basename='society_bureau_society')
router.register(r'manage/credit', CreditManageViewSet, basename='society_bureau_credit')
router.register(r'manage/settings', SettingsViewSet, basename='society_bureau_settings')

urlpatterns = router.urls
