from rest_framework import status
from rest_framework.decorators import api_view, permission_classes

from our_groceries.serializers import ItemSerializer, ListSerializer, RoleSerializer, UserSerializer, \
    UserOptionsSerializer

from our_groceries.models import Item, List, Role, UserProfile

from our_groceries.helper import permission_check_list, permission_check_list_by_id

from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.db.models import Q
from django.contrib.auth.models import User

from datetime import date, timedelta


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    """Register a new user
    Security: none
    """

    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        new_user = serializer.save()
        up = UserProfile(user=new_user)
        up.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def list_permissions(request, list_id):
    try:
        list = List.objects.get(id=list_id)
        user = request.user
        return Response({"permission_level": permission_check_list(user, list), "list_type": list.list_type},
                        status=status.HTTP_200_OK)
    except List.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def item_create(request):
    """Create a new Item
    Security: User needs to be logged in
    """
    serializer = ItemSerializer(data=request.data)

    list_id = serializer.initial_data['list']

    permission_level = permission_check_list_by_id(request.user, list_id)

    if permission_level < 2:
        return Response(status=status.HTTP_403_FORBIDDEN)
    elif permission_level == 2:
        # Items are not
        serializer.initial_data['accepted'] = False

    if serializer.is_valid():
        # ToDo Check for dupl.
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def item_checked(request, item_id):
    checked = request.data['checked']
    try:
        item = Item.objects.get(id=item_id)

        permission_level = permission_check_list(request.user, item.list)

        if permission_level < 2:
            return Response(status=status.HTTP_403_FORBIDDEN)

        item.checked = checked
        item.save()
        return Response(status=status.HTTP_202_ACCEPTED)
    except Item.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['PUT'])
def move_item(request, item_id, list_id):
    try:
        item = Item.objects.get(id=item_id)
        new_list = List.objects.get(id=list_id)

        permission_level_old_list = permission_check_list(request.user, item.list)
        permission_level_new_list = permission_check_list(request.user, new_list)

        if permission_level_new_list < 2 or permission_level_old_list < 2:
            return Response(status=status.HTTP_403_FORBIDDEN)

        # If the user only has app_req permission
        if permission_level_new_list == 2:
            item.accepted = False

        item.list = new_list
        item.save()
        return Response(status=status.HTTP_202_ACCEPTED)
    except Item.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except List.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def item_by_list(request, list_id):
    try:
        item = Item.objects.filter(list__id=list_id)
        permission_level = permission_check_list_by_id(request.user, list_id)

        if permission_level < 1:
            return Response(status=status.HTTP_403_FORBIDDEN)

    except Item.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = ItemSerializer(item, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def list_setcurrent(request, list_id, position):
    user_id = request.user.id
    try:
        user_profile = UserProfile.objects.get(user__id=user_id)
        list = List.objects.get(id=list_id)

        permission_level = permission_check_list(request.user, list)

        if permission_level < 1:
            return Response(status=status.HTTP_403_FORBIDDEN)

        if position == '1':
            user_profile.list1 = list
            user_profile.save()
            return Response(status=status.HTTP_200_OK)
        elif position == '2':
            user_profile.list2 = list
            user_profile.save()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    except List.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except UserProfile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def user_getcurrentlist(request):
    user_id = request.user.id
    try:
        user_profile = UserProfile.objects.get(user__id=user_id)
        current_list = []
        if user_profile.list1 is not None:
            current_list.append(user_profile.list1.id)
        if user_profile.list2 is not None:
            current_list.append(user_profile.list2.id)
        return Response(current_list, status=status.HTTP_200_OK)
    except UserProfile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def user_list(request):
    """Get all user options for permissions in frontend (name and id only)"""
    users = User.objects.all()
    serializer = UserOptionsSerializer(users, many=True)
    return Response(serializer.data)


# GET => Return the item of the given id
# PUT => Update a item
# DELETE => Delete the item
@api_view(['GET', 'PUT', 'DELETE'])
def item_update(request, item_id):
    # Get the object to modify
    try:
        item = Item.objects.get(id=item_id)
        permission_level = permission_check_list(request.user, item.list)
    except Item.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        # Check read permission
        if permission_level < 1:
            return Response(status=status.HTTP_403_FORBIDDEN)

        serializer = ItemSerializer(item)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        # Check write permission
        if permission_level < 2:
            return Response(status=status.HTTP_403_FORBIDDEN)

        serializer = ItemSerializer(item, data=request.data)
        # Check is approval req.
        if permission_level == 2:
            serializer.initial_data['accepted'] = False

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    elif request.method == 'DELETE':
        # Check write permission for delete
        if permission_level < 2:
            return Response(status=status.HTTP_403_FORBIDDEN)

        item.delete()
        return Response(status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def list_list(request):
    if request.user.is_superuser:
        lists = List.objects.all()
    else:
        # If a role exits, it needs to be at least read permission
        lists = List.objects.filter(Q(owner=request.user.id) | Q(roles__user=request.user.id)).distinct()
    serializer = ListSerializer(lists, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def list_create(request):
    serializer = ListSerializer(data=request.data)
    serializer.initial_data['owner'] = request.user.id
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# GET => Return the list of the given id
# PUT => Update a list
# DELETE => Delete the list
@api_view(['GET', 'PUT', 'DELETE'])
def list_update(request, list_id):
    # Get the object to modify
    try:
        list = List.objects.get(id=list_id)
        permission_level = permission_check_list(request.user, list)
    except List.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        # Check read permission
        if permission_level < 1:
            return Response(status=status.HTTP_403_FORBIDDEN)

        serializer = ListSerializer(list)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        # Check full control
        if permission_level < 4:
            return Response(status=status.HTTP_403_FORBIDDEN)

        serializer = ListSerializer(list, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    elif request.method == 'DELETE':
        # Check full control
        if permission_level < 4:
            return Response(status=status.HTTP_403_FORBIDDEN)

        list.delete()
        return Response(status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET'])
# def role_list(request):
#    roles = Role.objects.all()
#    # role = Role.objects.filter(list__id=list_id)
#    serializer = RoleSerializer(roles, many=True)
#    return Response(serializer.data)


@api_view(['GET'])
def role_options(request, list_id):
    """Get all the roles for a list"""

    permission_level = permission_check_list_by_id(request.user, list_id)

    # Only the owner/co-owner can handle roles
    if permission_level < 4:
        return Response(status=status.HTTP_403_FORBIDDEN)

    roles = Role.objects.filter(list__id=list_id)
    serializer = RoleSerializer(roles, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def role_create(request):
    # User is given as user_name
    serializer = RoleSerializer(data=request.data)

    if serializer.is_valid():
        list_id = serializer.initial_data['list']
        permission_level = permission_check_list_by_id(request.user, list_id)

        # Only the owner/co-owner can handle roles
        if permission_level < 4:
            return Response(status=status.HTTP_403_FORBIDDEN)

        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# GET => Return the role of the given id
# PUT => Update a role
# DELETE => Delete the role
@api_view(['GET', 'PUT', 'DELETE'])
def role_update(request, role_id):
    # Get the object to modify
    try:
        role = Role.objects.get(id=role_id)
        permission_level = permission_check_list(request.user, role.list)

        # Only the owner/co-owner can handle roles
        if permission_level < 4:
            return Response(status=status.HTTP_403_FORBIDDEN)

    except Role.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = RoleSerializer(role)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        serializer = RoleSerializer(role, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    elif request.method == 'DELETE':
        role.delete()
        return Response(status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def item_expire(request):
    user_id = request.user.id
    today4 = date.today() + +timedelta(days=4)
    # All Items where the user is owner, in a cooled list which will expire in 4 days or less (+expired ones)
    items = Item.objects.filter(list__owner=user_id, expires__isnull=False, expires__lt=today4, list__list_type=1)
    serializer = ItemSerializer(items, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
