from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.mixins import RetrieveModelMixin, ListModelMixin
from rest_framework.generics import RetrieveUpdateAPIView

from society.models import Society
from society_bureau.serializers import (
    SocietySerializer,
    SocietyMiniSerializer
)
from utils.permissions import IsSocietyBureau


class DashboardViewSet(viewsets.GenericViewSet):
    permission_classes = (IsSocietyBureau,)

    @action(
        detail=False,
        methods=['GET']
    )
    def statistic(self, request):
        pass


class SocietyManageViewSet(
    viewsets.GenericViewSet,
    ListModelMixin,
    RetrieveUpdateAPIView
):
    queryset = Society.objects.all()
    # permission_classes = (IsSocietyBureau, )

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return SocietySerializer
        return SocietyMiniSerializer
