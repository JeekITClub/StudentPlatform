import json
from django.utils import timezone
from rest_framework import viewsets, status, mixins, generics
from rest_framework.response import Response
from rest_framework.decorators import action

from society_bureau.models import SiteSettings
from society_bureau.api.services import SettingsService
from society.models import Society
from society.constants import SocietyStatus
from society_manage.models import CreditDistribution
from society.api.serializers import (
    SocietySerializer,
    SocietyMiniSerializer
)
from society_bureau.api.serializers import (
    CreditDistributionMiniSerializer,
    CreditDistributionSerializer,
    ConfirmSocietySerializer,
    CreditDistributionManualCreateSerializer,
    CreditDistributionBulkCreateSerializer,
    DashboardSerializer,
    SiteSettingsRetrieveSerializer,
    SiteSettingsUpdateSerializer
)
from utils.permissions import (
    IsSocietyBureau,
    SocietyIsWaiting,
    SocietyIsActive,
    SocietyIsArchived
)
from utils.filters import (
    NameFilterBackend,
    TypeFilterBackend,
    CreditNameFilterBackend,
    YearFilterBackend,
    SemesterFilterBackend,
    StatusFilterBackend
)


class DashboardViewSet(viewsets.GenericViewSet):
    permission_classes = (IsSocietyBureau,)
    serializer_class = DashboardSerializer

    @action(
        detail=False,
        methods=['GET']
    )
    def statistic(self, request):
        serializer = self.get_serializer(instance=request.user)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


class SocietyManageViewSet(
    viewsets.GenericViewSet,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.DestroyModelMixin
):
    filter_backends = [NameFilterBackend, TypeFilterBackend, StatusFilterBackend]

    def get_queryset(self):
        return Society.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return SocietyMiniSerializer
        elif self.action == 'confirm':
            return ConfirmSocietySerializer
        return SocietySerializer

    def get_permissions(self):
        if self.action == 'confirm':
            permission_classes = [IsSocietyBureau, SocietyIsWaiting]
        elif self.action == 'archive':
            permission_classes = [IsSocietyBureau, SocietyIsActive]
        elif self.action == 'destroy':
            permission_classes = [IsSocietyBureau, SocietyIsArchived]
        else:
            permission_classes = [IsSocietyBureau]
        return [permission() for permission in permission_classes]

    @action(detail=True, methods=['post'])
    def confirm(self, request, pk=None):
        society = self.get_object()
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            # leave the society_id empty in frontend
            # to generate id automatically
            if serializer.data['society_id'] is None:
                society_id = society.auto_generate_id()
            else:
                society_id = serializer.data['society_id']

            # check whether the id given is legal
            if society.check_id(society_id):
                society.society_id = society_id
                society.status = SocietyStatus.ACTIVE
                society.save()
                return Response(status=status.HTTP_202_ACCEPTED)
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={'detail': '社团ID错误'}
            )
        return Response(
            status=status.HTTP_400_BAD_REQUEST,
            data={'detail': '表单填写错误'}
        )

    @action(detail=True, methods=['post'])
    def archive(self, request, pk=None):
        society = self.get_object()
        society.society_id = None
        society.status = SocietyStatus.ARCHIVED
        society.members.clear()
        society.user.is_active = False
        society.user.save()
        society.save()

        credit_distribution = CreditDistribution.objects.filter(
            society=society,
            year=SettingsService.get('year'),
            semester=SettingsService.get('semester'),
            closed=False
        )
        if credit_distribution.exists():
            credit_distribution.first().receivers.clear()
        return Response(status=status.HTTP_202_ACCEPTED)


class CreditManageViewSet(
    viewsets.GenericViewSet,
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    generics.UpdateAPIView,
    mixins.ListModelMixin,
):
    permission_classes = (IsSocietyBureau,)
    filter_backends = [YearFilterBackend, SemesterFilterBackend]

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return CreditDistributionSerializer
        elif self.action == 'create':
            return CreditDistributionManualCreateSerializer
        return CreditDistributionMiniSerializer

    def get_queryset(self):
        return CreditDistribution.objects.all().order_by('-year', '-semester', 'society__society_id')

    @action(detail=False, methods=['post'])
    def bulk_create(self, request):
        serializer = CreditDistributionBulkCreateSerializer(data=request.data)
        if serializer.is_valid():
            for society in Society.objects.filter(status=SocietyStatus.WAITING):
                CreditDistribution.objects.create(
                    society=society,
                    semester=request.data['semester'],
                    year=request.data['year']
                )
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class SettingsViewSet(
    viewsets.GenericViewSet,
    generics.UpdateAPIView,
    mixins.ListModelMixin
):
    permission_classes = [IsSocietyBureau, ]

    def get_serializer_class(self):
        if self.action == 'list':
            return SiteSettingsRetrieveSerializer
        return SiteSettingsUpdateSerializer

    def get_queryset(self):
        default_settings = json.dumps({
            'year': timezone.datetime.now().year,
            'semester': 1
        })
        settings = SiteSettings.objects.all().first()
        if settings is None:
            return SiteSettings.objects.create(settings=default_settings)
        return settings

    def list(self, request, *args, **kwargs):
        serializer = self.get_serializer_class()(instance=self.get_queryset())
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer_class()(data=request.data)
        if serializer.is_valid():
            SettingsService.set('year', serializer.validated_data['year'])
            SettingsService.set('semester', serializer.validated_data['semester'])
            return Response(status=status.HTTP_202_ACCEPTED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
