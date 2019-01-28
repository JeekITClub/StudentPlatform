from rest_framework import permissions


class IsStudent(permissions.BasePermission):
    message = 'Student Only'

    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        return request.user == obj.user
