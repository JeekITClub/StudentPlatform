from rest_framework import viewsets, response, status
from rest_framework.decorators import action, permission_classes
from rest_framework.generics import UpdateAPIView
from rest_framework.mixins import ListModelMixin
from rest_framework.response import Response

from utils.permissions import IsSociety, ActivityEditable
from society.models import Society, JoinSocietyRequest, ActivityRequest
from society_manage.api.serializers import (
    JoinSocietyRequestSerializer,
    ReviewJoinSocietyRequestSerializer,
    KickMemberSerializer,
    ActivityRequestSerializer,
    ActivityRequestMiniSerializer
)
from student.models import Student
from student.api.serializers import StudentMiniSerializer


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


@permission_classes((IsSociety,))
class ActivityRequestViewSet(viewsets.ModelViewSet):
    serializer_class = ActivityRequestSerializer

    def get_serializer_class(self):
        if self.action == 'content':
            return ActivityRequestSerializer
        elif self.action == 'list':
            return ActivityRequestMiniSerializer
        return ActivityRequestSerializer

    def get_queryset(self):
        return ActivityRequest.objects.filter(society__user=self.request.user)

    def filter_queryset(self, queryset):
        if 'status' in self.request.query_params:
            return queryset.filter(status=self.request.query_params['status'])
        return queryset

    @permission_classes((ActivityEditable,))
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)
