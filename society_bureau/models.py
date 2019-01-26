from django.db import models
from django.contrib.auth.models import User
from student.models import Student


# Create your models here.


class SocietyBureau(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    real_name = models.CharField(max_length=64)
    qq = models.CharField(max_length=32, blank=True)
    email = models.EmailField(blank=True)
    password_changed = models.BooleanField(default=False)

    def __str__(self):
        return self.real_name
