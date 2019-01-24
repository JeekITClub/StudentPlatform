from rest_framework import viewsets, mixins

from society.models import Society
from society.api.serializers import SocietySerializer, SocietyMiniSerializer


class SocietyViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.CreateModelMixin):
    queryset = Society.objects.filter(confirmed=True)
    serializer_class = SocietySerializer

    def get_serializer_class(self):
        if self.action == 'content':
            return SocietySerializer
        elif self.action == 'list':
            return SocietyMiniSerializer
        return SocietySerializer
