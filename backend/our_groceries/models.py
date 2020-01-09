from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now


class UserProfileManager(models.Manager):
    pass


class ListManager(models.Manager):
    pass


class ItemManager(models.Manager):
    pass


class RoleManager(models.Manager):
    pass


class List(models.Model):
    # Enums
    list_types = (
        (1, "Cooled"),
        (2, "Shopping"),
    )

    name = models.TextField(max_length=100)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name="owned_lists")
    location = models.TextField(max_length=100, blank=True)
    list_type = models.IntegerField(choices=list_types)
    objects = ListManager()

    class Meta:
        verbose_name_plural = "lists"

    def __str__(self):
        return self.name


class UserProfile(models.Model):
    # django user account
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    list1 = models.ForeignKey(List, on_delete=models.SET_NULL, null=True, blank=True, related_name="activeAs1")
    list2 = models.ForeignKey(List, on_delete=models.SET_NULL, null=True, blank=True, related_name="activeAs2")
    objects = UserProfileManager()

    class Meta:
        verbose_name_plural = "userprofiles"

    def __str__(self):
        return self.user.username


class Item(models.Model):
    # Enums
    priority_types = (
        (1, "Low"),
        (2, "Medium"),
        (3, "High"),
    )

    # General Item
    name = models.TextField(max_length=100)
    checked = models.BooleanField(default=False)
    priority = models.IntegerField(choices=priority_types, default=2)
    amount = models.PositiveIntegerField(null=True)
    accepted = models.BooleanField(default=True)
    list = models.ForeignKey(List, on_delete=models.CASCADE, related_name="items")
    expires = models.DateField(blank=True, default=now, null=True)
    objects = ItemManager()

    class Meta:
        verbose_name_plural = "items"

    def __str__(self):
        return self.name


class Role(models.Model):
    # Enums
    role_types = (
        (1, "Read"),
        (2, "Approval_req"),
        (3, "Modify"),
        (4, "Co-owner"),
    )
    role_type = models.IntegerField(choices=role_types)
    user = models.ForeignKey(User, related_name="roles", on_delete=models.CASCADE)
    list = models.ForeignKey(List, related_name="roles", on_delete=models.CASCADE)
    objects = RoleManager()

    class Meta:
        verbose_name_plural = "roles"

    def __str__(self):
        return '%s %s (%s)' % (self.role_type, self.user.username, self.list)
