# functions in this file do not belong to any class
import os
from datetime import datetime

from openpyxl import Workbook
from tempfile import NamedTemporaryFile


def avatar_storage_path(instance, filename):
    return 'avatar/{0}/{1}{2}'.format(instance.id, datetime.now(), os.path.splitext(filename)[1])


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
