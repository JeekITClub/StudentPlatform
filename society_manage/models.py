from django.db import models
from society.models import Society, Student


class CreditReceivers(models.Model):
    society = models.ForeignKey(Society, on_delete=models.DO_NOTHING, related_name='credit_receivers')
    receivers = models.ManyToManyField(Student, blank=True, related_name='credit_givers')
    year = models.PositiveSmallIntegerField()
    semester = models.PositiveSmallIntegerField()

    class Meta:
        unique_together = ("society", "year", "semester")

    def __str__(self):
        return str(self.society)
