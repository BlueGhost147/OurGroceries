from rest_framework import serializers
from our_groceries.models import Item, List, UserProfile, Role


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'


class ListSerializer(serializers.ModelSerializer):
    owner_name = serializers.SerializerMethodField(),

    class Meta:
        model = List
        fields = '__all__'

    def get_owner_name(self, obj):
        return obj.owner.name if obj.owner else ''


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'


class RoleSerializer(serializers.ModelSerializer):
    user_name = serializers.SerializerMethodField(),
    list_name = serializers.SerializerMethodField(),

    class Meta:
        model = Role
        fields = '__all__'

    def get_user_name(self, obj):
        return obj.user.user_name if obj.user else ''

    def get_role_name(self, obj):
        return obj.role.name if obj.role else ''
