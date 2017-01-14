from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^todo/', include('docker_django.apps.todo.urls')),
    url(r'^', include('docker_django.apps.smap.urls')),
]
