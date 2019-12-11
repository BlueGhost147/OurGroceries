from django.contrib import admin
from .models import *


class ItemAdmin(admin.ModelAdmin): pass


class ListAdmin(admin.ModelAdmin): pass


class UserAdmin(admin.ModelAdmin): pass


class RoleAdmin(admin.ModelAdmin): pass


admin.site.register(Item, ItemAdmin)
admin.site.register(List, ListAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(Role, RoleAdmin)
