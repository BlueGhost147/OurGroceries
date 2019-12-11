from rest_framework import serializers
from backend.our_groceries.our_groceries.models import Item, List, User, Role


class ItemOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'


class ListSerializer(serializers.ModelSerializer):
    owner_name = serializers.SerializerMethodField(),

    class Meta:
        model = List
        fields = ['id', 'name', 'owner_name', 'location', 'list_type']

    def get_owner_name(self, obj):
        return obj.owner.name if obj.owner else ''


class UserOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class RoleSerializer(serializers.ModelSerializer):
    user_name = serializers.SerializerMethodField(),
    list_name = serializers.SerializerMethodField(),

    class Meta:
        model = Role
        fields = ['user_name', 'list_name', 'role_type']

    def get_user_name(self, obj):
        return obj.user.user_name if obj.user else ''

    def get_role_name(self, obj):
        return obj.role.name if obj.role else ''
