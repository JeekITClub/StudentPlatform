from rest_framework import serializers

from society.models import Society
from society_bureau.api.services import SettingsService
from society_bureau.models import SiteSettings
from society_manage.models import CreditDistribution

from student.api.serializers import StudentMiniSerializer


class SocietySerializer(serializers.ModelSerializer):
    class Meta:
        model = Society
        fields = '__all__'


class SocietyMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Society
        fields = (
            'id',
            'society_id',
            'name',
            'type',
            'president_name',
            'president_class',
            'president_grade'
        )


class ConfirmSocietySerializer(serializers.ModelSerializer):
    class Meta:
        model = Society
        fields = ('id', 'society_id')


class SettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = '__all__'


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
        fields = ('id', 'society', 'credit', 'year', 'semester', 'receivers_count', 'closed')
        read_only_fields = ('society', 'year', 'semester')


class CreditDistributionSerializer(serializers.ModelSerializer):
    receivers = StudentMiniSerializer(many=True, read_only=True)
    society = SocietyMiniSerializer(read_only=True)

    class Meta:
        model = CreditDistribution
        fields = '__all__'


class CreditDistributionManualCreateSerializer(serializers.Serializer):
    society_id = serializers.IntegerField()
    credit = serializers.IntegerField()

    class Meta:
        fields = ('society_id', 'credit')

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
            society=Society.objects.get(society_id=validated_data['society_id']),
            credit=self.validated_data['credit'],
            semester=SettingsService.get('semester'),
            year=SettingsService.get('year')
        )
