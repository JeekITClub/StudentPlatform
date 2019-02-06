from rest_framework import serializers

from society.models import Society


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
            'president_name',
            'president_class',
            'president_grade'
        )
