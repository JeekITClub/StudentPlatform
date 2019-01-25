from django.db import models
from django.contrib.auth.models import User
from student.models import Student
from society.constants import (
    member_confirm_status,
    society_type
)
from society.constants import MemberConfirmStatus
from student.constants import (
    grade_choices,
    class_choices,
)


# Create your models here.


class Society(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    members = models.ManyToManyField(Student, through='SocietyMemberRelationShip')
    society_id = models.PositiveIntegerField(null=True, blank=True)
    name = models.CharField(max_length=64)
    introduction = models.TextField(blank=True)
    president_name = models.CharField(max_length=64)
    president_grade = models.PositiveSmallIntegerField(choices=grade_choices)
    president_class = models.PositiveSmallIntegerField(choices=class_choices)
    president_qq = models.CharField(max_length=32, blank=True)
    achievements = models.TextField(blank=True)
    recruit = models.BooleanField(default=False)
    email = models.EmailField(blank=True)
    type = models.PositiveSmallIntegerField(choices=society_type)
    confirmed = models.BooleanField(default=False)
    recruit_qq_group = models.CharField(max_length=32, blank=True)
    established_time = models.DateTimeField(blank=True, null=True)

    class Meta:
        ordering = ['-established_time']

    def __str__(self):
        return str(self.society_id) + ' ' + self.name


class SocietyMemberRelationShip(models.Model):
    society = models.ForeignKey(Society, on_delete=models.DO_NOTHING)
    member = models.ForeignKey(Student, on_delete=models.DO_NOTHING)
    status = models.PositiveSmallIntegerField(choices=member_confirm_status, default=MemberConfirmStatus.WAITING)

    def __str__(self):
        return str(self.society) + ' ' + str(self.member)
