import os
from config.settings import BASE_DIR

member_confirm_status = (
    (0, '审核中'),
    (1, '通过'),
    (2, '未通过')
)

society_type = (
    (1, '自立精神'),
    (2, '共生意识'),
    (3, '科学态度'),
    (4, '人文情怀'),
    (5, '领袖气质'),
)

activity_confirm_status = (
    (0, '审核中'),
    (1, '通过'),
    (2, '未通过')
)

society_status = (
    (0, '审核中'),
    (1, '活跃'),
    (2, '归档')
)


class JoinSocietyRequestStatus:
    WAITING = 0
    ACCEPTED = 1
    DENIED = 2


class SocietyType:
    SELFRELIANCE = 1
    SYMBIOSIS = 2
    SCIENTIFIC = 3
    HUMANISTIC = 4
    LEADERSHIP = 5


class ActivityRequestStatus:
    WAITING = 0
    ACCEPTED = 1
    DENIED = 2


class SocietyStatus:
    WAITING = 0
    ACTIVE = 1
    ARCHIVED = 2


AVATAR_MAX_SIZE = 5 * 1024 * 1024

TEST_FILE_PATH = os.path.join(BASE_DIR, 'testing', 'files')
