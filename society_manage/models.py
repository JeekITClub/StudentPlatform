from django.db import models
from society.models import Society, Student
from society_bureau.api.services import SettingsService


class CreditReceivers(models.Model):
    society = models.ForeignKey(Society, on_delete=models.DO_NOTHING, related_name='credit_receivers')
    receivers = models.ManyToManyField(Student, blank=True, related_name='credit_givers')
    year = models.PositiveSmallIntegerField()
    semester = models.PositiveSmallIntegerField()
    available = models.BooleanField(default=False)

    class Meta:
        unique_together = ("society", "year", "semester")

    def __str__(self):
        return '{0}-{1}-{2}-{3}'.format(
            self.society.society_id,
            self.society.name,
            self.year,
            self.semester
        )

    @property
    def count(self):
        return self.receivers.count()

    # return the members of a society which can receive credits
    # (haven't receive any credit this semester)
    # p.s. quite stupid
    @property
    def candidates(self):
        candidates = []

        for member in self.society.members.all():
            credit_count = member.credit_givers.filter(
                year=SettingsService.get('year'),
                semester=SettingsService.get('semester')
            ).count()
            if credit_count == 0:
                candidates.append(member)

        return candidates
