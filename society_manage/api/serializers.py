from rest_framework import serializers
from student.api.serializers import StudentMiniSerializer
from society.models import JoinSocietyRequest


class JoinSocietyRequestSerializer(serializers.ModelSerializer):
    member = StudentMiniSerializer()

    class Meta:
        model = JoinSocietyRequest
        fields = ('member', 'status')
