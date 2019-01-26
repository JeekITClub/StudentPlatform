from django.contrib import admin
from django.urls import path, include

from config.router import router
urlpatterns = [
    path('api/', include(router.urls)),
    path('admin/', admin.site.urls),
]
