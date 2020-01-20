from rest_framework import serializers
from our_groceries.models import Item, List, UserProfile, Role
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password


class UserOptionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


# Source: https://stackoverflow.com/questions/49189484/how-to-mention-password-field-in-serializer/53553337
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=True,
        help_text='',
        style={'input_type': 'password', 'placeholder': 'Password'}
    )

    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data.get('password'))
        return super(UserSerializer, self).create(validated_data)


class ItemSerializer(serializers.ModelSerializer):
    listType = serializers.SerializerMethodField()

    def get_listType(self, obj):
        return obj.list.list_type

    class Meta:
        model = Item
        fields = '__all__'


class ListSerializer(serializers.ModelSerializer):
    owner_name = serializers.SerializerMethodField()

    class Meta:
        model = List
        fields = ['id', 'name', 'location', 'owner', 'owner_name', 'list_type']

    def get_owner_name(self, obj):
        return obj.owner.username if obj.owner else ''


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'


class RoleSerializer(serializers.ModelSerializer):
    user_name = serializers.SerializerMethodField()

    class Meta:
        model = Role
        fields = ['id', 'role_type', 'user', 'user_name', 'list']

    def get_user_name(self, obj):
        return obj.user.username if obj.user else ''
