from functools import reduce
from our_groceries.models import Role, List


def permission_check_list(user, list):
    """Calculate the permission level of the user for a list
        (1, "Read"),
        (2, "Approval_req"),
        (3, "Modify"),
        (4, "Co-owner"),
    """

    if user.is_superuser:
        # Superusers always have permission
        return 4
    elif user == list.owner:
        # The owner of the list has permission
        return 4
    else:
        matching_roles = Role.objects.filter(user=user, list=list)
        if matching_roles:
            high_role = reduce((lambda role1, role2: role1 if role1.role_type > role2.role_type else role2),
                               matching_roles)
            return high_role.role_type
        else:
            return 0


def permission_check_list_by_id(user, listId):
    try:
        list = List.objects.get(id=listId)
        return permission_check_list(user, list)
    except List.DoesNotExist:
        return 0
