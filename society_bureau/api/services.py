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
        return settings

    @classmethod
    def get_dict(cls):
        settings = cls.get_instance()
        return json.loads(settings.settings)

    @classmethod
    def get(cls, key):
        settings = cls.get_instance()
        return json.loads(settings.settings).get(key, None)

    @classmethod
    def update(cls, encoded_json):
        settings = SiteSettings.objects.all().first()
        settings.settings = encoded_json
        settings.save()

    @classmethod
    def set(cls, key, value):
        settings_content = cls.get_dict()
        settings_content[key] = value
        cls.update(json.dumps(settings_content))
