from django.db import models
from django.contrib.auth.models import User
from student.constants import (
    class_choices
)


# Create your models here.

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=64)
    grade = models.PositiveSmallIntegerField()
    class_num = models.PositiveSmallIntegerField(choices=class_choices)
    qq = models.CharField(max_length=32, blank=True)
    password_changed = models.BooleanField(default=False)

    def __str__(self):
        return self.name

    def has_receive_credit(self, year, semester):
        receive_credit_from = self.receive_credit_from.filter(
            year=year,
            semester=semester
        )
        if receive_credit_from.exists():
            return receive_credit_from.first().society.id
        return None
