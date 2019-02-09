from rest_framework import viewsets
from rest_framework.generics import RetrieveUpdateAPIView

from student.models import Student
from student.api.serializers import (
    StudentSerializer,
    StudentUpdateProfileSerializer,
)

from utils.permissions import IsStudentSelf


class StudentViewSet(
    viewsets.GenericViewSet,
    RetrieveUpdateAPIView
):
    queryset = Student.objects.all()
    permission_classes = (IsStudentSelf,)

    def get_serializer_class(self):
        if self.action == 'update':
            return StudentUpdateProfileSerializer
        return StudentSerializer
