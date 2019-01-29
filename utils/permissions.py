from rest_framework import permissions

from student.models import

class IsStudent(permissions.BasePermission):
    message = 'Student Only'

    def has_permission(self, request, view):
        return request.user.is_authenticated and hasattr(request.user, 'student')

    def has_object_permission(self, request, view, obj):
        return request.user == obj.user


class JoinSociety(IsStudent):
    message = '不能加入社团'

    def has_object_permission(self, request, view, obj):
        return request.user.student not in obj.members and not JoinSocietyRequest


class AccessSocietyAdmin(permissions.BasePermission):
    message = 'Society Only'

    def has_permission(self, request, view):
        return request.user.is_authenticated and hasattr(request.user, 'society')


class AccessSocietyBureauAdmin(permissions.BasePermission):
    message = 'Society Bureau Only'

    def has_permission(self, request, view):
        return request.user.is_authenticated and hasattr(request.user, 'society_bureau')
