from rest_framework import serializers
from student.api.serializers import StudentMiniSerializer
from society.models import JoinSocietyRequest, ActivityRequest, Society
from society_manage.models import CreditDistribution


class JoinSocietyRequestSerializer(serializers.ModelSerializer):
    member = StudentMiniSerializer()

    class Meta:
        model = JoinSocietyRequest
        fields = ('id', 'member', 'status')


class ReviewJoinSocietyRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = JoinSocietyRequest
        fields = ('status',)


class KickMemberSerializer(serializers.Serializer):
    member_id = serializers.IntegerField()

    class Meta:
        fields = ('member_id',)


class ActivityRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityRequest
        fields = '__all__'
        read_only_fields = ('status',)


class ActivityRequestMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityRequest
        fields = ('title', 'status', 'place', 'start_time')
        read_only_fields = ('status',)


class CreditDistributionSerializer(serializers.ModelSerializer):
    available_receivers = StudentMiniSerializer(many=True, source='get_available_receivers')
    receivers = serializers.SerializerMethodField()

    class Meta:
        model = CreditDistribution
        fields = ('credit', 'id', 'year', 'semester', 'receivers', 'available_receivers', 'closed')

    def get_receivers(self, obj):
        return [receiver.id for receiver in obj.receivers.all()]


class SocietyProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Society
        fields = '__all__'
        read_only_fields = ('id', 'society_id', 'avatar')


class UploadAvatarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Society
        fields = ('id', 'avatar',)
        read_only_fields = ('id',)
