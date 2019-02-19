from rest_framework import serializers
from django.contrib.auth.models import User

from society.models import Society
from student.models import Student


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
        fields = ('id', 'username', 'identity', 'password_changed',)

    def get_identity(self, obj):
        if hasattr(obj, 'student'):
            return StudentIdentitySerializer(obj.student).data
        elif hasattr(obj, 'society'):
            return SocietyIdentitySerializer(obj.society).data
        elif hasattr(obj, 'society_bureau'):
            return {
                'identity': 'society_bureau'
            }
        return {
            'identity': 'who are u?'
        }

    def get_password_changed(self, obj):
        if obj.check_password('123456'):
            return False
        return True


class SocietyIdentitySerializer(serializers.ModelSerializer):
    identity = serializers.SerializerMethodField()

    class Meta:
        model = Society
        fields = ('id', 'name', 'identity')

    def get_identity(self, obj):
        return 'society'


class StudentIdentitySerializer(serializers.ModelSerializer):
    identity = serializers.SerializerMethodField()

    class Meta:
        model = Student
        fields = ('id', 'name', 'identity')

    def get_identity(self, obj):
        return 'student'
