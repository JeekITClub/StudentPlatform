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


class MemberConfirmStatus:
    WAITING = 0
    ACCEPTED = 1
    DENIED = 2
