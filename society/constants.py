member_confirm_status = (
    (0, '审核中'),
    (1, '通过'),
    (2, '未通过')
)


class MemberConfirmStatus:
    WAITING = 0
    ACCEPTED = 1
    DENIED = 2
