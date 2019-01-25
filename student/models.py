from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=64)
    class_num = models.PositiveSmallIntegerField()
    grade = models.PositiveSmallIntegerField()
    qq = models.CharField(max_length=32, blank=True)

    def __str__(self):
        return self.name