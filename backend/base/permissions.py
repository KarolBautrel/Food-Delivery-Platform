from rest_framework.permissions import BasePermission, SAFE_METHODS


class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS


class RequestUserAllowed(BasePermission):
    message = "Only user of profile can update his account"

    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True
        return False

    def has_object_permission(self, request, view, obj):
        if obj == request.user:
            return True
        return False


class ContentCreatorAllow(BasePermission):
    message = "Only creator of messsage is allowed to edit message "

    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True
        return False

    def has_object_permission(self, request, view, obj):
        if obj.creator == request.user:
            return True
        return False


class TableBookerAllow(BasePermission):
    message = "Only booker of Table can delete it "

    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True
        return False

    def has_object_permission(self, request, view, obj):
        if obj.booker == request.user:
            return True
        return False
