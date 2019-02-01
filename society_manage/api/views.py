from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin

from society.models import Society, JoinSocietyRequest
from society_manage.api.serializers import JoinSocietyRequestSerializer


class SocietyMemberViewSet(viewsets.GenericViewSet, ListModelMixin):
    def get_queryset(self):
        return Society.objects.get(user=self.request.user).members.all()

    @action(detail=False, methods=['post'])
    def kick(self, request):
        pass


class JoinSocietyRequestViewSet(
    viewsets.GenericViewSet,
    ListModelMixin,
    UpdateModelMixin
):
    serializer_class = JoinSocietyRequestSerializer

    def get_queryset(self):
        return JoinSocietyRequest.objects.filter(society__user=self.request.user)

    def filter_queryset(self, queryset):
        if 'status' in self.request.query_params:
            return queryset.filter(status=self.request.query_params['status'])

        return queryset
