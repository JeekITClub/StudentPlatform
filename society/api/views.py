from rest_framework import viewsets, mixins, status
from rest_framework.decorators import action, permission_classes
from rest_framework.response import Response

from django.shortcuts import get_object_or_404

from society.constants import JoinSocietyRequestStatus
from society.models import Society, JoinSocietyRequest
from society.api.serializers import (
    SocietySerializer,
    SocietyMiniSerializer,
    JoinSocietyRequestSerializer
)
from utils.permissions import (
    IsStudent,
    JoinSociety,
    SingleJoinSocietyRequestCheck
)
from student.models import Student


class SocietyViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin):
    queryset = Society.objects.filter(confirmed=True)
    serializer_class = SocietySerializer

    def filter_queryset(self, queryset):
        # there is a better and more elegant way to implement it
        if 'name' in self.request.query_params:
            return queryset.filter(name__contains=self.request.query_params['name'])
        return queryset

    def get_serializer_class(self):
        if self.action == 'content':
            return SocietySerializer
        elif self.action == 'list':
            return SocietyMiniSerializer
        elif self.action == 'join':
            return JoinSocietyRequestSerializer
        return SocietySerializer

    @action(
        detail=True, methods=['post'],
        permission_classes=(IsStudent, JoinSociety, SingleJoinSocietyRequestCheck)
    )
    def join(self, request, pk=None):
        serializer = self.get_serializer(data={
            "society_id": self.get_object().id,
            "member_id": request.user.student.id,
        })
        if serializer.is_valid():
            serializer.save()
            return Response(data={'detail': '申请成功！请等待社团审核！'},
                            status=status.HTTP_201_CREATED)
        return Response(data={'detail': '申请失败！'},
                        status=status.HTTP_400_BAD_REQUEST)
