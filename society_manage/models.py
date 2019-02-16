from django.db import models

from society.models import Society, Student
from society_bureau.api.services import SettingsService


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

    @property
    def available_receivers(self):
        available_receivers = []
        members = self.society.members.all()
        year = SettingsService.get('year')
        semester = SettingsService.get('semester')
        for member in members:
            has_receiver_credit = member.has_receive_credit(year, semester)
            if has_receiver_credit == self.society.name or has_receiver_credit is None:
                available_receivers.append(member)
        return available_receivers
