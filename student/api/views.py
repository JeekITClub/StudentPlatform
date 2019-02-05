from rest_framework import viewsets, mixins, response, status
from rest_framework.decorators import action
from rest_framework.generics import RetrieveUpdateAPIView

from student.models import Student
from student.api.serializers import (
    StudentSerializer,
    StudentUpdateProfileSerializer,
    StudentChangePasswordSerializer
)

from utils.permissions import IsStudentSelf


class StudentViewSet(
    viewsets.GenericViewSet,
    RetrieveUpdateAPIView
):
    queryset = Student.objects.all()
    permission_classes = (IsStudentSelf,)

    def get_serializer_class(self):
        if self.action == 'change_password':
            return StudentChangePasswordSerializer
        elif self.action == 'update':
            return StudentUpdateProfileSerializer
        return StudentSerializer

    @action(methods=['POST'], detail=False)
    def change_password(self, request):
        serializer = self.get_serializer_class()(data=request.data)
        if not serializer.is_valid():
            error = '表单填写错误'
        elif not request.user.check_password(serializer.validated_data['old_password']):
            error = '原密码错误'
        else:
            success = '密码更改成功'
            request.user.set_password(serializer.validated_data['new_password'])
            request.user.save()
            return response.Response(data={'detail': success}, status=status.HTTP_202_ACCEPTED)
        return response.Response(data={'detail': error}, status=status.HTTP_400_BAD_REQUEST)
