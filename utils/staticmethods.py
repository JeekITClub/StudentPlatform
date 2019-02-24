# functions in this file do not belong to any class

def avatar_storage_path(instance, filename):
    return 'avatar/{0}/{1}'.format(instance.id, filename)