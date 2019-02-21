from rest_framework import viewsets, response, status
from rest_framework.decorators import action
from rest_framework.generics import UpdateAPIView, ListAPIView
from rest_framework.mixins import ListModelMixin

from society_bureau.api.services import SettingsService
from utils.filters import StatusFilterBackend
from utils.permissions import IsSociety, SocietyActivityEditable
from society.models import Society, JoinSocietyRequest, ActivityRequest
from society_manage.api.serializers import (
    JoinSocietyRequestSerializer,
    ReviewJoinSocietyRequestSerializer,
    KickMemberSerializer,
    ActivityRequestSerializer,
    ActivityRequestMiniSerializer,
    CreditDistributionSerializer,
)
from society_manage.models import CreditDistribution
from student.api.serializers import StudentMiniSerializer
from utils.filters import (
    StatusFilterBackend,
    YearFilterBackend,
    SemesterFilterBackend
)
from society_bureau.api.services import SettingsService


class SocietyMemberViewSet(viewsets.GenericViewSet, ListModelMixin):
    permission_classes = (IsSociety,)

    def get_serializer_class(self):
        if self.action == 'list':
            return StudentMiniSerializer
        elif self.action == 'kick':
            return KickMemberSerializer

    def get_queryset(self):
        return Society.objects.get(user=self.request.user).members.all()

    @action(detail=False, methods=['post'])
    def kick(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            member = self.get_queryset().filter(
                id=serializer.validated_data['member_id']
            ).first()
            if member is None:
                return response.Response(
                    data={'detail': '不存在该成员'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            society = request.user.society
            if member in society.members.all():
                society.members.remove(member)
            return response.Response(status=status.HTTP_202_ACCEPTED)
        return response.Response(
            status=status.HTTP_400_BAD_REQUEST,
            data={'detail': '表单填写错误'}
        )


class JoinSocietyRequestViewSet(
    viewsets.GenericViewSet,
    ListModelMixin,
    UpdateAPIView,
):
    permission_classes = (IsSociety,)
    serializer_class = JoinSocietyRequestSerializer

    filter_backends = [StatusFilterBackend, ]

    def get_serializer_class(self):
        if self.action == 'update':
            return ReviewJoinSocietyRequestSerializer
        return JoinSocietyRequestSerializer

    def get_queryset(self):
        return JoinSocietyRequest.objects.filter(society__user=self.request.user).order_by('created_at')


class ActivityRequestViewSet(viewsets.ModelViewSet):
    filter_backends = [StatusFilterBackend, ]

    def get_queryset(self):
        return ActivityRequest.objects.filter(society__user=self.request.user).order_by('-updated_at')

    def filter_queryset(self, queryset):
        if 'status' in self.request.query_params:
            return queryset.filter(status=self.request.query_params['status'])
        return queryset

    def get_permissions(self):
        if self.action == 'update' or self.action == 'partial_update':
            permission_classes = [IsSociety, SocietyActivityEditable]
        else:
            permission_classes = [IsSociety]
        return [permission() for permission in permission_classes]

    def get_serializer_class(self):
        if self.action == 'list':
            return ActivityRequestMiniSerializer
        return ActivityRequestSerializer


class SocietyCreditViewSet(
    viewsets.GenericViewSet,
    UpdateAPIView,
    ListAPIView
):
    permission_classes = (IsSociety,)

    def get_serializer_class(self):
        return CreditDistributionSerializer

    def get_queryset(self):
        return CreditDistribution.objects.filter(society=self.request.user.society).order_by('-year', '-semester')

    def list(self, request, *args, **kwargs):
        year = request.query_params.get('year', SettingsService.get('year'))
        semester = request.query_params.get('semester', SettingsService.get('semester'))
        self.queryset = self.get_queryset().filter(year=year).filter(semester=semester)
        instance = self.queryset.first()
        if instance:
            serializer = self.get_serializer(instance)
            return response.Response(serializer.data)
        return response.Response(status=status.HTTP_404_NOT_FOUND)

    def update(self, request, *args, **kwargs):
        if self.get_object().closed:
            return response.Response(status=status.HTTP_406_NOT_ACCEPTABLE)
        receiver_id_set = request.data.get('receivers', None)

        # receiver_id_set can be '[]'
        if receiver_id_set is not None:
            valid_receiver_set = []
            for receiver_id in receiver_id_set:
                student = request.user.society.members.filter(id=int(receiver_id)).first()
                credit_id = student.has_receive_credit(self.get_object().year, self.get_object().semester)
                if student is not None and (credit_id == request.user.society.id or credit_id is None):
                    valid_receiver_set.append(student)
            self.get_object().receivers.set(valid_receiver_set)
            return response.Response(status=status.HTTP_200_OK)
        return response.Response(status=status.HTTP_400_BAD_REQUEST)
