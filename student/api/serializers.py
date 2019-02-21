from rest_framework import serializers

from student.models import Student
from society.models import ActivityRequest
from society.api.serializers import SocietyMiniSerializer
from society_manage.models import CreditDistribution


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'


class StudentMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('id', 'name', 'grade', 'class_num', 'qq')


class StudentUpdateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('name', 'grade', 'class_num', 'qq')


class StudentInspectCreditSerializer(serializers.ModelSerializer):
    society = SocietyMiniSerializer(read_only=True)

    class Meta:
        model = CreditDistribution
        fields = ('society', 'semester', 'year',)


class StudentActivitySerializer(serializers.ModelSerializer):
    society = SocietyMiniSerializer(read_only=True)

    class Meta:
        model = ActivityRequest
        fields = '__all__'
        read_only_fields = ('status',)


class StudentActivityMiniSerializer(serializers.ModelSerializer):
    society = serializers.StringRelatedField()

    class Meta:
        model = ActivityRequest
        fields = ('id', 'title', 'place', 'start_time', 'society')
        read_only_fields = ('status',)
