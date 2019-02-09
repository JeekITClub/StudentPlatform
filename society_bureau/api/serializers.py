from rest_framework import serializers

from society.models import Society
from society_bureau.models import SiteSettings
from society_manage.models import CreditReceivers


class SocietySerializer(serializers.ModelSerializer):
    class Meta:
        model = Society
        fields = '__all__'


class SocietyMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Society
        fields = (
            'society_id',
            'name',
            'type',
            'president_name',
            'president_class',
            'president_grade'
        )


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


class SocietyCreditReceiversSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreditReceivers
        fields = '__all__'
