from rest_framework import viewsets, status
from rest_framework.generics import RetrieveAPIView, ListAPIView
from rest_framework.decorators import action
from rest_framework.response import Response

from society.models import Society
from society_manage.models import CreditDistribution
from society.api.serializers import (
    SocietySerializer,
    SocietyMiniSerializer,
    JoinSocietyRequestSerializer
)
from utils.permissions import (
    IsStudent,
    JoinSociety,
    QuitSociety,
    SingleJoinSocietyRequestCheck
)
from utils.filters import (
    NameFilterBackend
)
from society.constants import SocietyStatus
from society_bureau.api.services import SettingsService


class SocietyViewSet(viewsets.GenericViewSet, RetrieveAPIView, ListAPIView):
    queryset = Society.objects.filter(status=SocietyStatus.ACTIVE)
    serializer_class = SocietySerializer
    filter_backends = (NameFilterBackend,)

    def get_serializer_class(self):
        if self.action == 'retrieve':
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

    @action(
        detail=True, methods=['post'],
        permission_classes=(IsStudent, QuitSociety)
    )
    def quit(self, request, pk=None):
        society = self.get_object()
        member = request.user.student
        year = SettingsService.get('year')
        semester = SettingsService.get('semester')
        credit = CreditDistribution.objects.filter(
            society=society,
            year=year,
            semester=semester,
            closed=False
        )

        society.members.remove(member)

        if credit.exists() and society.status == SocietyStatus.ACTIVE:
            credit.first().receivers.remove(member)

        return Response(data={'detail': '退出成功！'},
                        status=status.HTTP_200_OK)
