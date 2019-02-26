# functions in this file do not belong to any class
from datetime import datetime
import os

def avatar_storage_path(instance, filename):
    return 'avatar/{0}/{1}{2}'.format(instance.id, datetime.now(), os.path.splitext(filename)[1])