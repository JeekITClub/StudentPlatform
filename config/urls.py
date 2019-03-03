from django.contrib import admin
from django.urls import path, include, re_path
from django.views.static import serve

from config.views import react
from config.router import router
from config import settings

urlpatterns = [
    path('', react),
    path('society/', react),
    path('api/', include(router.urls)),
    path('admin/', admin.site.urls),
    re_path(r'^media/(?P<path>.*)$', serve, {
        'document_root': settings.MEDIA_ROOT,
    }),
]
