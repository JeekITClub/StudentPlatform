from rest_framework import viewsets
from rest_framework.decorators import action

from utils.permissions import IsSocietyBureau


class DashboardViewSet(viewsets.ViewSet):

    @action(
        detail=False,
        methods=['GET'],
        permission_classes=(IsSocietyBureau,)
    )
    def statistic(self, request):
        pass
