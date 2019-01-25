from django.db import models
from django.contrib.auth.models import User
from student.models import Student


# Create your models here.


class Society(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    members = models.ManyToManyField(Student)
    society_id = models.PositiveIntegerField()
    name = models.CharField(max_length=64)
    introduction = models.TextField(blank=True)
    president_name = models.CharField(max_length=64)
    president_class = models.PositiveSmallIntegerField()
    president_grade = models.PositiveSmallIntegerField()
    president_qq = models.CharField(max_length=32, blank=True)
    achievements = models.TextField(blank=True)
    recruit = models.BooleanField(default=False)
    email = models.EmailField(blank=True)
    type = models.PositiveSmallIntegerField()
    confirmed = models.BooleanField(default=False)
    recruit_qq_group = models.CharField(max_length=32, blank=True)
    established_time = models.DateTimeField(blank=True, null=True)
