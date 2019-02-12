from django.contrib import admin
from society.models import Society, JoinSocietyRequest, ActivityRequest, SocietyTag


# Register your models here.

class SocietyAdmin(admin.ModelAdmin):
    list_display = ('society_id', 'name', 'status', 'recruit')


class JoinSocietyRequestAdmin(admin.ModelAdmin):
    list_display = ('society', 'member', 'status')


admin.site.register(Society, SocietyAdmin)
admin.site.register(JoinSocietyRequest, JoinSocietyRequestAdmin)
admin.site.register(ActivityRequest)
admin.site.register(SocietyTag)
