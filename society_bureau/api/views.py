from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.mixins import ListModelMixin
from rest_framework.generics import RetrieveUpdateAPIView

from society.models import Society
from society_bureau.api.serializers import (
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


class SocietyManageViewSet(viewsets.ModelViewSet):
    permission_classes = (IsSocietyBureau,)

    def get_queryset(self):
        return Society.objects.all()

    def filter_queryset(self, queryset):
        tmp_queryset = queryset
        if 'type' in self.request.query_params:
            tmp_queryset = tmp_queryset.filter(type=self.request.query_params['type'])
        if 'name' in self.request.query_params:
            tmp_queryset = tmp_queryset.filter(name__icontains=self.request.query_params['name'])
        return tmp_queryset
