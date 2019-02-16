from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth import (
    login as django_login,
    authenticate,
    logout as django_logout
)

from account.serializers import (
    LoginSerializer,
    ChangePasswordSerializer,
    UserDetailSerializer
)


class AccountViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['POST'])
    def login(self, request):
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        user = authenticate(
            username=serializer.validated_data['username'],
            password=serializer.validated_data['password']
        )
        if user is None:
            return Response({'detail': '登陆失败'}, status=status.HTTP_406_NOT_ACCEPTABLE)
        django_login(request, user)
        return Response(status=status.HTTP_200_OK)

    @action(detail=False, methods=['POST'])
    def logout(self, request):
        django_logout(request)
        return Response(status=status.HTTP_200_OK)

    @action(detail=False, methods=['POST'])
    def change_password(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        if not serializer.is_valid():
            error = '表单填写错误'
        elif not request.user.check_password(serializer.validated_data['old_password']):
            error = '原密码错误'
        else:
            success = '密码更改成功'
            request.user.set_password(serializer.validated_data['new_password'])
            request.user.save()
            return Response(data={'detail': success}, status=status.HTTP_202_ACCEPTED)
        return Response(data={'detail': error}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['GET'])
    def user(self, request):
        if not request.user.is_authenticated:
            return Response(status=status.HTTP_403_FORBIDDEN)
        serializer = UserDetailSerializer(request.user)
        return Response(serializer.data)
