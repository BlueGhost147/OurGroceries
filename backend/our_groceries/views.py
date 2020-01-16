from rest_framework import status
from rest_framework.decorators import api_view, permission_classes

from our_groceries.serializers import ItemSerializer, ListSerializer, RoleSerializer, UserSerializer

from our_groceries.models import Item, List, Role, UserProfile

from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Q


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        new_user = serializer.save()
        UserProfile(user=new_user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def item_list(request):
    items = Item.objects.all()
    serializer = ItemSerializer(items, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def item_options(request):
    items = Item.objects.all()
    serializer = ItemSerializer(items, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def item_create(request):
    serializer = ItemSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def item_checked(request, item_id):
    checked = request.data['checked']
    try:
        item = Item.objects.get(id=item_id)
        item.checked = checked
        item.save()
        return Response(status=status.HTTP_202_ACCEPTED)
    except Item.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['PUT'])
def move_item(request, item_id, list_id):
    try:
        item = Item.objects.get(id=item_id)
        item.list = List.objects.get(id=list_id)
        item.save()
        return Response(status=status.HTTP_202_ACCEPTED)
    except Item.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def item_by_list(request, list_id):
    try:
        item = Item.objects.filter(list__id=list_id)
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
def user_getAllItems(request):
    user_id = request.user.id;
    items = Item.objects.filter(list__owner=user_id)
    serializer = ItemSerializer(items, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# GET => Return the item of the given id
# PUT => Update a item
# DELETE => Delete the item
@api_view(['GET', 'PUT', 'DELETE'])
def item_update(request, item_id):
    # Get the object to modify
    try:
        item = Item.objects.get(id=item_id)
    except Item.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ItemSerializer(item)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        serializer = ItemSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    elif request.method == 'DELETE':
        item.delete()
        return Response(status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def list_list(request):
    if request.user.is_superuser:
        lists = List.objects.all()
    else:
        lists = List.objects.filter(Q(owner=request.user.id) | Q(roles__user=request.user.id))
    serializer = ListSerializer(lists, many=True)
    return Response(serializer.data)


# @api_view(['GET'])
# def list_options(request):
#   lists = List.objects.all()
#  serializer = ListSerializer(lists, many=True)
# return Response(serializer.data)


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
    except List.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ListSerializer(list)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        serializer = ListSerializer(list, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    elif request.method == 'DELETE':
        list.delete()
        return Response(status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def role_list(request):
    roles = Role.objects.all()
    serializer = RoleSerializer(roles, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def role_options(request):
    roles = Role.objects.all()
    serializer = RoleSerializer(roles, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def role_create(request):
    serializer = RoleSerializer(data=request.data)
    if serializer.is_valid():
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
