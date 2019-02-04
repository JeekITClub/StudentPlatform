from django.db import models
from django.contrib.auth.models import User
from student.models import Student
from society.constants import (
    member_confirm_status,
    society_type,
    activity_confirm_status
)
from society.constants import JoinSocietyRequestStatus, ActivityRequestStatus
from student.constants import (
    grade_choices,
    class_choices,
)


class SocietyTag(models.Model):
    content = models.CharField(max_length=8)
    color = models.CharField(max_length=16)


class Society(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    members = models.ManyToManyField(Student)
    society_id = models.PositiveIntegerField(null=True, blank=True, unique=True)
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
    password_changed = models.BooleanField(default=False)
    credit = models.PositiveSmallIntegerField(default=0)
    tags = models.ManyToManyField(SocietyTag)

    class Meta:
        ordering = ['-established_time']

    def __str__(self):
        return str(self.society_id) + ' ' + self.name


class JoinSocietyRequest(models.Model):
    society = models.ForeignKey(Society, on_delete=models.DO_NOTHING)
    member = models.ForeignKey(Student, on_delete=models.DO_NOTHING)
    status = models.PositiveSmallIntegerField(choices=member_confirm_status, default=JoinSocietyRequestStatus.WAITING)

    def __str__(self):
        return str(self.society) + ' ' + str(self.member)


class ActivityRequest(models.Model):
    society = models.ForeignKey(Society, on_delete=models.DO_NOTHING)
    title = models.CharField(max_length=32)
    content = models.TextField(null=True, blank=True)
    place = models.CharField(max_length=32)
    start_time = models.DateTimeField()
    status = models.PositiveSmallIntegerField(choices=activity_confirm_status, default=ActivityRequestStatus.WAITING)

    def __str__(self):
        return str(self.society) + ' ' + self.title
