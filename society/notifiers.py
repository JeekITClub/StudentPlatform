from django.db.models.signals import post_save
from notifications.signals import notify
from society.models import JoinSocietyRequest
from society.constants import JoinSocietyRequestStatus


def my_handler(sender, instance, created, **kwargs):
    if instance.status == JoinSocietyRequestStatus.ACCEPTED:
        notify.send(
            sender=instance.society,
            recipient=instance.member.user,
            verb='通过了你的入社申请',
            public=False
        )
    if instance.status == JoinSocietyRequestStatus.DENIED:
        notify.send(
            sender=instance.society,
            recipient=instance.member.user,
            verb='拒绝了你的入社申请',
            public=False
        )


post_save.connect(my_handler, sender=JoinSocietyRequest)
