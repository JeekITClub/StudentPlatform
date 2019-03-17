import json
from django.utils import timezone
from openpyxl import Workbook
from tempfile import NamedTemporaryFile

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


# 形如: 1 -> 自立精神 的转化由serializer完成
# filename: 无后缀文件名
def export_excel(queryset, header, serializer_class=None):
    try:
        fields = list(map(lambda x: x[0], header))
        titles = list(map(lambda x: x[1], header))
        wb = Workbook()
        ws = wb.active
        ws.append(titles)

        # 如果提供了serializer就优先使用其进行格式化
        if serializer_class:
            data = serializer_class(instance=queryset, many=True).data
        else:
            data = queryset.values(*fields)

        for row, item in enumerate(data):
            for col, field in enumerate(fields):
                # openpyxl 下标从1开始, row + 2因为第一行是表头
                ws.cell(row=row + 2, column=col + 1, value=item[field])

        tmp = NamedTemporaryFile()
        wb.save(tmp.name)
        return tmp
    except Exception as e:
        return None
