import json
from django.utils import timezone

from society_bureau.models import SiteSettings


# Singleton Pattern
class SettingsService:
    @classmethod
    def get_instance(cls):
        default_settings = json.dumps({
            'year': timezone.datetime.now().year,
            'semester': 1
        })
        settings = SiteSettings.objects.all().first()
        if settings is None:
            return SiteSettings.objects.create(settings=default_settings)
        else:
            return settings

    @classmethod
    def get_dict(cls):
        default_settings = {
            'year': timezone.datetime.now().year,
            'semester': 1
        }
        settings = SiteSettings.objects.all().first()
        if settings is None:
            SiteSettings.objects.create(settings=json.dumps(default_settings))
            return default_settings
        else:
            return json.loads(settings.settings)

    @classmethod
    def update(cls, content):
        settings = SiteSettings.objects.all().first()
        settings.settings = content
        settings.save()
