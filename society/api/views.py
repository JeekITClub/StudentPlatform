from rest_framework import viewsets, mixins

from society.models import Society
from society.api.serializers import SocietySerializer, SocietyMiniSerializer


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
        return SocietySerializer
