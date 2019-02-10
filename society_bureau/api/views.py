from rest_framework import viewsets, response, status
from rest_framework.decorators import action
from rest_framework.mixins import ListModelMixin, UpdateModelMixin, RetrieveModelMixin, DestroyModelMixin
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


class SocietyManageViewSet(
    viewsets.GenericViewSet,
    ListModelMixin,
    RetrieveModelMixin,
    DestroyModelMixin
):
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

    def get_serializer_class(self):
        if self.action == 'list':
            return SocietyMiniSerializer
        return SocietySerializer


class CreditManageViewSet(
    viewsets.GenericViewSet,
    ListModelMixin,
    UpdateModelMixin
):
    permission_classes = (IsSocietyBureau,)
    serializer_class = SocietyCreditSerializer

    def get_queryset(self):
        return Society.objects.all()

    def filter_queryset(self, queryset):
        tmp_queryset = queryset
        if 'type' in self.request.query_params:
            tmp_queryset = tmp_queryset.filter(type=self.request.query_params['type'])
        if 'name' in self.request.query_params:
            tmp_queryset = tmp_queryset.filter(name__icontains=self.request.query_params['name'])
        return tmp_queryset

    @action(detail=False, methods=['post'])
    def set_all(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            self.get_queryset().update(credit=request.data['credit'])
            return response.Response(status=status.HTTP_202_ACCEPTED)
        return response.Response(
            status=status.HTTP_400_BAD_REQUEST,
            data={'detail': '表单填写错误'}
        )


class CreditReceiversViewSet(
    viewsets.GenericViewSet,
    ListModelMixin,
    RetrieveModelMixin
):
    permission_classes = (IsSocietyBureau,)
    serializer_class = SocietyCreditReceiversSerializer

    def get_queryset(self):
        return CreditReceivers.objects.all()

    def filter_queryset(self, queryset):
        tmp_queryset = queryset
        if 'name' in self.request.query_params:
            tmp_queryset = tmp_queryset.filter(society__name__icontains=self.request.query_params['name'])
        if 'year' in self.request.query_params:
            tmp_queryset = tmp_queryset.filter(year=self.request.query_params['year'])
        if 'semester' in self.request.query_params:
            tmp_queryset = tmp_queryset.filter(semester=self.request.query_params['semester'])
        return tmp_queryset
