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
    path('item/create', views.item_create),
    path('item/<int:item_id>/get', views.item_update),
    path('item/<int:item_id>/update', views.item_update),
    path('item/<int:item_id>/delete', views.item_update),

    path('item/<int:item_id>/checked', views.item_checked),

    path('item/<int:item_id>/move/<int:list_id>/', views.move_item),

    path('item/list/<int:list_id>/get', views.item_by_list),

    path('list/list', views.list_list),
    path('list/options', views.list_list),
    path('list/create', views.list_create),
    path('list/<int:list_id>/get', views.list_update),
    path('list/<int:list_id>/update', views.list_update),
    path('list/<int:list_id>/delete', views.list_update),
    path('list/<int:list_id>/permissions', views.list_permissions),

    path('list/<int:list_id>/set/<position>/', views.list_setcurrent),

    path('item/expire/', views.item_expire),
    path('role/options/<int:list_id>', views.role_options),
    path('role/create', views.role_create),
    path('role/<int:role_id>/get', views.role_update),
    path('role/<int:role_id>/update', views.role_update),
    path('role/<int:role_id>/delete', views.role_update),

    path('user/getlists/', views.user_getcurrentlist),
    path('user/list', views.user_list),

    url(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    url(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    url(r'^api-token-auth/', obtain_jwt_token),
    path(r'register/', views.register),
]
