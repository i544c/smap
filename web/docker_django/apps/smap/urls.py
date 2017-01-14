from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.home, name='home'),
    url(r'^sumari/$', views.smari, name='sumari'),
    url(r'^sumari/(?P<id>[0-9]+)$', views.update_sumari, name='update'),
    url(r'^sumari/(?P<id>[0-9]+)/good$', views.good, name='good'),
    url(r'^tag$', views.tag, name='tag'),
    url(r'^hakodate_mock$', views.hakodate_mock, name='hakodate_mock')
]
