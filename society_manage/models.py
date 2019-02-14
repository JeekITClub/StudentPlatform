from django.db import models
from society.models import Society, Student


class CreditDistribution(models.Model):
    society = models.ForeignKey(Society, on_delete=models.DO_NOTHING, related_name='distributed_credit')
    receivers = models.ManyToManyField(Student, blank=True, related_name='receive_credit_from', default=None)
    year = models.PositiveSmallIntegerField()
    semester = models.PositiveSmallIntegerField()
    credit = models.PositiveSmallIntegerField(help_text='可获得学分的人数的最大值', default=1)
    closed = models.BooleanField(default=False)

    class Meta:
        unique_together = ("society", "year", "semester")

    def __str__(self):
        return self.society.name

    @property
    def receivers_count(self):
        return self.receivers.count()
