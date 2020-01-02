from graphene_django import DjangoObjectType
import graphene
from student.models import Student
from django.contrib.auth.models import User


class StudentType(DjangoObjectType):
    class Meta:
        model = Student


class Query(graphene.ObjectType):
    students = graphene.List(StudentType)

    def resolve_students(self, info):
        return Student.objects.all()

class StudentMutation(graphene.Mutation):
    class Arguments:
        # The input arguments for this mutation
        username = graphene.String(required=True)

    # The class attributes define the response of the mutation
    student = graphene.Field(StudentType)

    def mutate(self, info, username):
        user = User.objects.create_user(username=username, password='12331' + 'ncjnb')
        student = Student.objects.create(
            user=user,
            name='123',
            grade=1,
            class_num=1,
            qq='123'
        )
        # Notice we return an instance of this mutation
        return StudentMutation(student=student)


class Mutation(graphene.ObjectType):
    create_student = StudentMutation.Field()