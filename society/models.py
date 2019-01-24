from django.db import models

# Create your models here.


class Society(models.Model):
    society_id = models.PositiveIntegerField()
    name = models.CharField(max_length=64)
    introduction = models.TextField(blank=True)
    # TODO: Should use OneToOneField to represent President
    president_name = models.CharField(max_length=16)
    president_class = models.PositiveSmallIntegerField()
    president_grade = models.PositiveSmallIntegerField()
    president_qq = models.CharField(max_length=16, blank=True)
    achievements = models.TextField(blank=True)
    recruit = models.BooleanField(default=False)
    email = models.EmailField(blank=True)
    type = models.PositiveSmallIntegerField()
    confirmed = models.BooleanField(default=False)
    recruit_qq_group = models.CharField(max_length=64, blank=True)
    established_time = models.DateTimeField(blank=True, null=True)
