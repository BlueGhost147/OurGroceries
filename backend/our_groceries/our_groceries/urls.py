"""our_groceries URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.urls import path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view

from django.contrib import admin

from . import views

from rest_framework_jwt.views import obtain_jwt_token

schema_view = get_schema_view(
    openapi.Info(
        title='API',
        default_version='v1'
    ),
)


urlpatterns = [
    path('admin/', admin.site.urls),

    path('item/list', views.item_list),
    path('item/options', views.item_options),
    path('item/create', views.item_create),
    path('item/<int:item_id>/get', views.item_update),
    path('item/<int:item_id>/update', views.item_update),
    path('item/<int:item_id>/delete', views.item_update),

    path('list/list', views.list_list),
    path('list/options', views.list_options),
    path('list/create', views.list_create),
    path('list/<int:list_id>/get', views.list_update),
    path('list/<int:list_id>/update', views.list_update),
    path('list/<int:list_id>/delete', views.list_update),

    path('role/list', views.role_list),
    path('role/options', views.role_options),
    path('role/create', views.role_create),
    path('role/<int:role_id>/get', views.role_update),
    path('role/<int:role_id>/update', views.role_update),
    path('role/<int:role_id>/delete', views.role_update),

    url(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    url(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    url(r'^api-token-auth/', obtain_jwt_token),
]
