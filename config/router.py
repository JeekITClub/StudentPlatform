from rest_framework import routers

from society.api.views import SocietyViewSet
from student.api.views import StudentViewSet

router = routers.SimpleRouter()

router.register(r'society', SocietyViewSet, base_name='society')
router.register(r'student', StudentViewSet, base_name='student')

urlpatterns = router.urls
