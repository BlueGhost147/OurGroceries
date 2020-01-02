from django.contrib import admin
from our_groceries.models import Item, List, UserProfile, Role


class ItemAdmin(admin.ModelAdmin):
    pass;


class ListAdmin(admin.ModelAdmin):
    pass;


class UserProfileAdmin(admin.ModelAdmin):
    pass;


class RoleAdmin(admin.ModelAdmin):
    pass;


admin.site.register(Item, ItemAdmin)
admin.site.register(List, ListAdmin)
admin.site.register(UserProfile, UserProfileAdmin)
admin.site.register(Role, RoleAdmin)
