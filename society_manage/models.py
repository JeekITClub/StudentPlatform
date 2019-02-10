from django.db import models
from society.models import Society, Student


class CreditReceivers(models.Model):
    society = models.ForeignKey(Society, on_delete=models.DO_NOTHING)
    receivers = models.ForeignKey(Student, on_delete=models.DO_NOTHING, blank=True, null=True)
    year = models.PositiveSmallIntegerField()
    semester = models.PositiveSmallIntegerField()

    def __str__(self):
        return str(self.society)
