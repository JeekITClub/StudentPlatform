from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.mixins import ListModelMixin, UpdateModelMixin, RetrieveModelMixin, DestroyModelMixin

from society.models import Society
from society_manage.models import CreditDistribution
from society_bureau.api.serializers import (
    SocietySerializer,
    SocietyMiniSerializer,
    ConfirmSocietySerializer,
    SocietyCreditSerializer,
    # CreditReceiversSerializer,
    # CreditReceiversMiniSerializer
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
from society.constants import SocietyStatus


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
        society.status = SocietyStatus.ARCHIVED
        society.user.is_active = False
        society.user.save()
        society.save()
        return Response(status=status.HTTP_202_ACCEPTED)


class CreditManageViewSet(
    viewsets.GenericViewSet,
    ListModelMixin,
    UpdateModelMixin,

):
    permission_classes = (IsSocietyBureau,)
    serializer_class = SocietyCreditSerializer

    def get_queryset(self):
        return Society.objects.filter(status=SocietyStatus.ACTIVE)

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
            for society in Society.objects.filter(status=SocietyStatus.ACTIVE):
                CreditDistribution.objects.create(
                    society=society,
                    credit=serializer.validated_data['credit']
                )
            return Response(status=status.HTTP_202_ACCEPTED)
        return Response(
            status=status.HTTP_400_BAD_REQUEST,
            data={'detail': '表单填写错误'}
        )


# class CreditReceiversViewSet(
#     viewsets.GenericViewSet,
#     ListModelMixin,
#     RetrieveModelMixin
# ):
#     permission_classes = (IsSocietyBureau,)
#     queryset = CreditReceivers.objects.all()
#     filter_backends = [CreditNameFilterBackend, YearFilterBackend, SemesterFilterBackend]
#
#     def get_serializer_class(self):
#         if self.action == 'list':
#             return CreditReceiversMiniSerializer
#         return CreditReceiversSerializer
