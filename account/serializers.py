from rest_framework import serializers
from django.contrib.auth.models import User


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField()
    new_password = serializers.CharField()


class UserDetailSerializer(serializers.ModelSerializer):
    identity = serializers.SerializerMethodField()
    password_changed = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('identity', 'password_changed',)

    def get_identity(self, obj):
        if hasattr(obj, 'student'):
            return 'student'
        elif hasattr(obj, 'society'):
            return 'society'
        elif hasattr(obj, 'society_bureau'):
            return 'society_bureau'
        return 'who are u?'

    def get_password_changed(self, obj):
        if obj.check_password('123456'):
            return False
        return True
