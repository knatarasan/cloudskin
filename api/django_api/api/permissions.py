from rest_framework import permissions
import logging

logger = logging.getLogger('django')

class GraphUserPermission(permissions.BasePermission):
    edit_methods = ("PUT", "PATCH")

    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True

    def has_object_permission(self, request, view, obj):
        logger.info(f' requst.user { request.user} and obj.owner : {obj.owner}')
        if request.user.is_superuser:
            return True

        if obj.owner == request.user:
            return True

        return False