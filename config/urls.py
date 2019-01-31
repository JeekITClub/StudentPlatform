from django.contrib import admin
from django.urls import path, include
from config.views import react

from config.router import router
urlpatterns = [
    path('', react),
    path('society/', react),
    path('api/', include(router.urls)),
    path('admin/', admin.site.urls),
]
