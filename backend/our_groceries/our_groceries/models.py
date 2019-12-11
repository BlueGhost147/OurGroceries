from django.db import models

class User(models.Model):
    user_name = models.TextField(max_length=100)
    #password =
    is_admin = bool,
    year_of_birth = models.IntegerField(null=True)

    def __str__(self):
        return self.user_name


class Item(models.Model):

    # Enums
    priority_types = (
        (1, "Low"),
        (2, "Medium"),
        (3, "High"),
                     ),

    # General Item
    name = models.TextField(max_length=100)

    # Missing Item
    checked = bool,
    priority = models.IntegerField(choices=priority_types, default=2),
    amount = models.PositiveIntegerField(null=True),
    accepted = bool,

    # Cool Item
    expires = models.DateField(null=True),

    def __str__(self):
        return self.name


class List(models.Model):

    #Enums
    list_types = (
        (1, "Cooled"),
        (2, "Sopping"),
                 ),

    name = models.TextField(max_length=100),
    owner = models.ForeignKey(User, on_delete=models.CASCADE),
    location = models.TextField(max_length=100, null=True),
    list_type = models.IntegerField(choices=list_types),

    def __str__(self):
        return self.name




class Role(models.Model):

    #Enums
    role_types = (
        (1, "Read"),
        (2, "Approval_req"),
        (3, "Modify"),
        (3, "Co-owner"),
    ),

    role_type = models.IntegerField(choices=role_types),
    user = models.ForeignKey(User, on_delete=models.CASCADE),
    list = models.ForeignKey(List, on_delete=models.CASCADE),

    def __str__(self):
        return '%s %s (%s)' % (self.role_type, self.user, self.list)
