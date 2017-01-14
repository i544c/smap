from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.home, name='home'),
    url(r'^sumari$', views.smari, name='sumari'),
    url(r'^hakodate_mock$', views.hakodate_mock, name='hakodate_mock')
]
