from django.contrib.auth.models import User
from datetime import datetime, timedelta
from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator

from society.models import Society, ActivityRequest
from society_bureau.api.services import SettingsService
from society_bureau.models import SiteSettings
from society_manage.models import CreditDistribution

from student.api.serializers import StudentMiniSerializer
from society.api.serializers import SocietyMiniSerializer

from society.constants import SocietyStatus, ActivityRequestStatus


class DashboardSerializer(serializers.ModelSerializer):
    active_user_count = serializers.SerializerMethodField()
    waiting_society_count = serializers.SerializerMethodField()
    society_count = serializers.SerializerMethodField()
    waiting_activity_count = serializers.SerializerMethodField()
    activity_count = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = (
            'active_user_count',
            'waiting_society_count',
            'society_count',
            'waiting_activity_count',
            'activity_count'
        )

    def get_active_user_count(self, obj):
        recent = datetime.now() - timedelta(days=60)
        return User.objects.filter(last_login__gte=recent).count()

    def get_waiting_society_count(self, obj):
        return Society.objects.filter(status=SocietyStatus.WAITING).count()

    def get_society_count(self, obj):
        return Society.objects.exclude(status=SocietyStatus.WAITING).count()

    def get_waiting_activity_count(self, obj):
        return ActivityRequest.objects.filter(status=ActivityRequestStatus.WAITING).count()

    def get_activity_count(self, obj):
        return ActivityRequest.objects.exclude(status=ActivityRequestStatus.WAITING).count()


class ConfirmSocietySerializer(serializers.ModelSerializer):
    class Meta:
        model = Society
        fields = ('id', 'society_id')


class SocietyCreditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Society
        fields = (
            'society_id',
            'name',
            'credit'
        )
        read_only_fields = ('society_id', 'name')

    def to_internal_value(self, data):
        credit = data.get('credit')
        if not credit:
            raise serializers.ValidationError({
                'credit': 'This field is required.'
            })

        return {
            'credit': int(credit)
        }

    def validate(self, data):
        if data['credit'] < 0 or data['credit'] > 32767:
            raise serializers.ValidationError("Credit value is incorrect.")
        return data


class CreditDistributionMiniSerializer(serializers.ModelSerializer):
    society = SocietyMiniSerializer(read_only=True)

    class Meta:
        model = CreditDistribution
        fields = ('id', 'society', 'credit', 'year', 'semester', 'receivers_count', 'open')
        read_only_fields = ('society', 'year', 'semester')


class CreditDistributionSerializer(serializers.ModelSerializer):
    receivers = StudentMiniSerializer(many=True, read_only=True)
    society = SocietyMiniSerializer(read_only=True)

    class Meta:
        model = CreditDistribution
        fields = '__all__'


class CreditDistributionManualCreateSerializer(serializers.Serializer):
    year = serializers.IntegerField()
    semester = serializers.IntegerField()
    society_id = serializers.IntegerField()

    class Meta:
        validators = [
            UniqueTogetherValidator(
                queryset=CreditDistribution.objects.all(),
                fields=['year', 'semester', 'society_id']
            )
        ]

    def validate_society_id(self, society_id):
        if Society.objects.filter(society_id=society_id).exists():
            return society_id
        raise serializers.ValidationError("No such society with society_id {society_id}".format(
            society_id=society_id
        ))

    def validate_credit(self, credit):
        if credit < 0:
            raise serializers.ValidationError("Credit must be bigger than zero")
        return credit

    def create(self, validated_data):
        return CreditDistribution.objects.create(
            year=validated_data['year'],
            semester=validated_data['semester'],
            society=Society.objects.get(society_id=validated_data['society_id'])
        )

class CreditDistributionBulkCreateSerializer(serializers.Serializer):
    year = serializers.IntegerField()
    semester = serializers.IntegerField()


class SiteSettingsRetrieveSerializer(serializers.Serializer):
    year = serializers.SerializerMethodField()
    semester = serializers.SerializerMethodField()

    class Meta:
        fields = ('year', 'semester')

    def get_year(self, obj):
        return SettingsService.get('year')

    def get_semester(self, obj):
        return SettingsService.get('semester')


class YearSemesterSerializer(serializers.Serializer):
    year = serializers.IntegerField()
    semester = serializers.IntegerField()

    class Meta:
        fields = ('year', 'semester')
