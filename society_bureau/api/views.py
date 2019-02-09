from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.mixins import ListModelMixin, UpdateModelMixin, RetrieveModelMixin
from rest_framework.generics import RetrieveUpdateAPIView

from society.models import Society
from society_manage.models import CreditReceivers
from society_bureau.api.serializers import (
    SocietySerializer,
    SocietyMiniSerializer,
    SocietyCreditSerializer,
    SocietyCreditReceiversSerializer
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


class CreditManageViewSet(
    viewsets.GenericViewSet,
    ListModelMixin,
    UpdateModelMixin
):
    permission_classes = (IsSocietyBureau,)
    serializer_class = SocietyCreditSerializer
    queryset = Society.objects.all()

    def filter_queryset(self, queryset):
        tmp_queryset = queryset
        if 'type' in self.request.query_params:
            tmp_queryset = tmp_queryset.filter(type=self.request.query_params['type'])
        if 'name' in self.request.query_params:
            tmp_queryset = tmp_queryset.filter(name__icontains=self.request.query_params['name'])
        return tmp_queryset

    @action(detail=False, methods=['post'])
    def set_all(self, request):
        self.queryset.update(credit=request.data['credit'])


class CreditReceiversManageViewSet(
    viewsets.GenericViewSet,
    ListModelMixin,
    RetrieveModelMixin
):
    permission_classes = (IsSocietyBureau,)
    serializer_class = SocietyCreditReceiversSerializer
    queryset = CreditReceivers.objects.all()

    def filter_queryset(self, queryset):
        tmp_queryset = queryset
        if 'year' in self.request.query_params:
            tmp_queryset = tmp_queryset.filter(year=self.request.query_params['year'])
        if 'semester' in self.request.query_params:
            tmp_queryset = tmp_queryset.filter(semester=self.request.query_params['semester'])
        return tmp_queryset
