from graphene_django import DjangoObjectType
from graphene import relay
import graphene
from student.models import Student
from society.models import Society
from society.constants import (
    SocietyStatus
)


class StudentModel(DjangoObjectType):
    class_num = graphene.Int()

    class Meta:
        model = Student


class SocietyModel(DjangoObjectType):
    class Meta:
        model = Society


class Query(graphene.ObjectType):
    students = graphene.List(StudentModel)
    societies = graphene.List(SocietyModel)

    def resolve_students(self, info):
        return Student.objects.all()

    def resolve_societies(self, info):
        return Society.objects.filter(status=SocietyStatus.ACTIVE)

#
# class IntroduceShip(relay.ClientIDMutation):
#     class Input:
#         username = graphene.String(required=True)
#
#     @classmethod
#     def mutate_and_get_payload(cls, root, info, ship_name, faction_id, client_mutation_id=None):
#         return IntroduceShip(ship=ship, faction=faction)
#
#
# class Mutation(graphene.ObjectType):
