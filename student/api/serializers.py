from rest_framework import serializers

from student.models import Student


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


class StudentChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField()
    new_password = serializers.CharField()


class StudentMiniField(serializers.RelatedField):
    queryset = Student.objects.all()

    def to_representation(self, value):
        return {
            'id': value.id,
            'info': '%s %s' % (value.user.username, value.name)
        }
