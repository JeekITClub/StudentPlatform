from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth import (
    login as django_login,
    authenticate,
    logout as django_logout
)

from account.serializers import LoginSerializer


class AuthViewSet(viewsets.ViewSet):
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
            return Response({'detail': '不存在该用户'})
        django_login(request, user)
        return Response(status=status.HTTP_200_OK)

    @action(detail=False, methods=['POST'])
    def logout(self, request):
        django_logout(request)
        return Response(status=status.HTTP_200_OK)
