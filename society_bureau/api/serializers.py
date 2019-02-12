from rest_framework import serializers

from society.models import Society
from society_bureau.models import SiteSettings
from society_manage.models import CreditReceivers

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


class CreditReceiversMiniSerializer(serializers.ModelSerializer):
    society = SocietyMiniSerializer(read_only=True)

    class Meta:
        model = CreditReceivers
        fields = ('id', 'society', 'year', 'semester', 'count')


class CreditReceiversSerializer(serializers.ModelSerializer):
    receivers = StudentMiniSerializer(many=True, read_only=True)
    society = SocietyMiniSerializer(read_only=True)

    class Meta:
        model = CreditReceivers
        fields = '__all__'
