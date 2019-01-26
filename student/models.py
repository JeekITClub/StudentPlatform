from django.db import models
from django.contrib.auth.models import User
from student.constants import (
    grade_choices,
    class_choices
)


# Create your models here.

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=64)
    grade = models.PositiveSmallIntegerField(choices=grade_choices)
    class_num = models.PositiveSmallIntegerField(choices=class_choices)
    qq = models.CharField(max_length=32, blank=True)
    password_changed = models.BooleanField(default=False)

    def __str__(self):
        return self.name
