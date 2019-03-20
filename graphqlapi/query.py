from graphene_django import DjangoObjectType
import graphene
from student.models import Student


class StudentModel(DjangoObjectType):
    class Meta:
        model = Student


class Query(graphene.ObjectType):
    students = graphene.List(StudentModel)

    def resolve_students(self, info):
        return Student.objects.all()
