from rest_framework import viewsets
from rest_framework.generics import RetrieveUpdateAPIView, ListAPIView
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin

from student.models import Student
from society.models import Society, ActivityRequest
from student.api.serializers import (
    StudentSerializer,
    StudentUpdateProfileSerializer,
    StudentInspectCreditSerializer,
    StudentActivitySerializer,
    StudentActivityMiniSerializer
)
from society.api.serializers import SocietyMiniSerializer

from utils.permissions import IsStudentSelf, IsStudent
from society.constants import SocietyStatus, ActivityRequestStatus


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


class StudentCreditViewSet(
    viewsets.GenericViewSet,
    ListAPIView
):
    permission_classes = [IsStudent, ]
    serializer_class = StudentInspectCreditSerializer

    def get_queryset(self):
        return self.request.user.student.receive_credit_from.all()


class StudentSocietyViewSet(viewsets.GenericViewSet, ListAPIView):
    serializer_class = SocietyMiniSerializer

    def get_queryset(self):
        return self.request.user.student.society_set.exclude(status=SocietyStatus.WAITING)


class StudentActivityViewSet(
    viewsets.GenericViewSet,
    ListModelMixin,
    RetrieveModelMixin
):
    queryset = ActivityRequest.objects.filter(status=ActivityRequestStatus.ACCEPTED).order_by('-start_time')

    def get_serializer_class(self):
        if self.action == 'list':
            return StudentActivityMiniSerializer
        return StudentActivitySerializer
