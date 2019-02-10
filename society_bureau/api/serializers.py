from rest_framework import serializers

from society.models import Society
from society_bureau.models import SiteSettings


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
