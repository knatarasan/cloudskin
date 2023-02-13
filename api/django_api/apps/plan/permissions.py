import logging

from rest_framework import permissions

logger = logging.getLogger(__name__)


class PlanUserPermission(permissions.BasePermission):
    edit_methods = ("PUT", "PATCH")

    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True

    def has_object_permission(self, request, view, obj):
        # TODO - Need to remove the superuser check. Instead we should use impersonation that has better control
        if request.user.is_superuser:
            return True

        if obj.owner == request.user:
            return True

        return False
