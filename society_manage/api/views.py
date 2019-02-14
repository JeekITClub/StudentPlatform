from rest_framework import viewsets, response, status
from rest_framework.decorators import action
from rest_framework.generics import UpdateAPIView
from rest_framework.mixins import ListModelMixin, UpdateModelMixin

from utils.permissions import IsSociety, SocietyActivityEditable
from society.models import Society, JoinSocietyRequest, ActivityRequest
from society_manage.models import CreditReceivers
from society_manage.api.serializers import (
    JoinSocietyRequestSerializer,
    ReviewJoinSocietyRequestSerializer,
    KickMemberSerializer,
    ActivityRequestSerializer,
    ActivityRequestMiniSerializer,
    CreditReceiversSerializer,
    CreditReceiversUpdateSerializer
)
from student.api.serializers import StudentMiniSerializer
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

    def get_serializer_class(self):
        if self.action == 'update':
            return ReviewJoinSocietyRequestSerializer
        return JoinSocietyRequestSerializer

    def get_queryset(self):
        return JoinSocietyRequest.objects.filter(society__user=self.request.user)

    def filter_queryset(self, queryset):
        if 'status' in self.request.query_params:
            return queryset.filter(status=self.request.query_params['status'])
        return queryset


class ActivityRequestViewSet(viewsets.ModelViewSet):

    def get_queryset(self):
        return ActivityRequest.objects.filter(society__user=self.request.user)

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


class SocietyCreditReceiversViewSet(
    viewsets.GenericViewSet,
    ListModelMixin,
):
    permission_classes = (IsSociety,)

    # only credit_receivers at current semester is available
    def get_queryset(self):
        return CreditReceivers.objects.filter(
            society__user=self.request.user,
            year=SettingsService.get('year'),
            semester=SettingsService.get('semester')
        )

    def get_serializer_class(self):
        if self.action == 'replace':
            return CreditReceiversUpdateSerializer
        return CreditReceiversSerializer

    def list(self, request, *args, **kwargs):
        instance = self.get_queryset().first()
        if instance is None:
            return response.Response(
                status=status.HTTP_404_NOT_FOUND,
                data={'detail': '社团部伤未设置本学期学分'}
            )

        serializer = self.get_serializer(instance=instance)
        return response.Response(serializer.data)

    # default route 'update' cannot be override
    @action(detail=False, methods=['post'])
    def replace(self, request):
        instance = self.get_queryset().first()
        if instance is None:
            return response.Response(
                status=status.HTTP_404_NOT_FOUND,
                data={'detail': '社团部伤未设置本学期学分'}
            )

        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return response.Response(status=status.HTTP_202_ACCEPTED)
        return response.Response(
            status=status.HTTP_400_BAD_REQUEST,
            data={
                'detail': '表单填写错误',
                'error': str(serializer.errors['non_field_errors'][0])
            }
        )
