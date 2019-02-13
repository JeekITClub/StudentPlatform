from rest_framework import serializers
from student.api.serializers import StudentMiniSerializer
from society.models import JoinSocietyRequest, ActivityRequest
from society_manage.models import CreditReceivers


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


class CreditReceiversSerializer(serializers.ModelSerializer):
    receivers = StudentMiniSerializer(many=True)

    class Meta:
        model = CreditReceivers
        fields = '__all__'


class CreditReceiversUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreditReceivers
        fields = '__all__'

    def validate(self, data):
        for member in data['receivers']:
            if member not in self.instance.society.members.all():
                raise serializers.ValidationError("Not a member of this society.")

            givers_count = member.credit_givers.filter(year=self.instance.year, semester=self.instance.semester).count()
            if member not in self.instance.receivers.all() and givers_count != 0:
                raise serializers.ValidationError("Illegal credit receiver.")
        return data
