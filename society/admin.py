from django.contrib import admin
from society.models import Society, JoinSocietyRequest


# Register your models here.

class SocietyAdmin(admin.ModelAdmin):
    list_display = ('society_id', 'name', 'confirmed', 'recruit')


class JoinSocietyRequestAdmin(admin.ModelAdmin):
    list_display = ('society', 'member', 'status')


admin.site.register(Society, SocietyAdmin)
admin.site.register(JoinSocietyRequest, JoinSocietyRequestAdmin)
