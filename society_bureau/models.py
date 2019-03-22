from django.db import models
from django.contrib.auth.models import User
from student.models import Student


class SocietyBureau(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='society_bureau')
    real_name = models.CharField(max_length=64)
    qq = models.CharField(max_length=32, blank=True)
    phone = models.CharField(max_length=32, blank=True)
    email = models.EmailField(blank=True)
    password_changed = models.BooleanField(default=False)

    def __str__(self):
        return self.real_name


class SiteSettings(models.Model):
    settings = models.TextField()
