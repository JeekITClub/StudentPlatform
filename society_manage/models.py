from django.db import models
from society.models import Society, Student


class CreditReceivers(models.Model):
    society = models.ForeignKey(Society, on_delete=models.DO_NOTHING, related_name='credit_receivers')
    receivers = models.ManyToManyField(Student, blank=True, related_name='credit_givers')
    year = models.PositiveSmallIntegerField()
    semester = models.PositiveSmallIntegerField()
    available = models.BooleanField(default=False)

    class Meta:
        unique_together = ("society", "year", "semester")

    def __str__(self):
        return '{0}-{1}-{2}-{3}'.format(self.society.society_id, self.society.name, self.year, self.semester)

    @property
    def count(self):
        return self.receivers.count()
