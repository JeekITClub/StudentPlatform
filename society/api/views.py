from rest_framework import viewsets, mixins, status
from rest_framework.decorators import action
from rest_framework.response import Response

from django.shortcuts import get_object_or_404

from society.models import Society, JoinSocietyRequest
from society.api.serializers import (
    SocietySerializer,
    SocietyMiniSerializer,
    JoinSocietyRequestSerializer
)
from society.constants import MemberConfirmStatus
from student.models import Student


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

    @action(detail=True, methods=['post'])
    def join(self, request, pk=None):
        society = get_object_or_404(Society, pk=pk)
        if hasattr(request.user, 'student') and request.user.is_active:
            student = request.user.student
        else:
            return Response(data={'detail': '只有在校的学生账户可以加入社团！'},
                            status=status.HTTP_401_UNAUTHORIZED)

        # Check if the user is in the society already
        if student in society.members.all():
            return Response(data={'detail': '申请失败！你已经加入了该社团！'},
                            status=status.HTTP_406_NOT_ACCEPTABLE)

        # Check if there is existing request
        existing_request = JoinSocietyRequest.objects.filter(member=student, society=society,
                                                             status=MemberConfirmStatus.WAITING).first()
        if existing_request is not None:
            return Response(data={'detail': '申请已发出！请勿重复申请！'},
                            status=status.HTTP_406_NOT_ACCEPTABLE)

        serializer = JoinSocietyRequestSerializer(data={
            "society": pk,
            "member": student.pk,
            'status': MemberConfirmStatus.WAITING
        })
        if serializer.is_valid():
            serializer.save()
            return Response(data={'detail': '申请成功！请等待社团审核！'},
                            status=status.HTTP_201_CREATED)
        else:
            return Response(data={'detail': '申请失败！'},
                            status=status.HTTP_400_BAD_REQUEST)
