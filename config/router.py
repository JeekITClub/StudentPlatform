from rest_framework import routers

from society.api.views import SocietyViewSet

router = routers.SimpleRouter()

router.register(r'society', SocietyViewSet, base_name='society')

urlpatterns = router.urls
