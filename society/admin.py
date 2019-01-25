from django.contrib import admin
from society.models import Society, SocietyMemberRelationShip


# Register your models here.

class SocietyAdmin(admin.ModelAdmin):
    list_display = ('society_id', 'name', 'member_count', 'confirmed', 'recruit')

    def member_count(self, obj):
        return obj.user.is_active

class SocietyMemberRelationShipAdmin(admin.ModelAdmin):
    list_display = ('society', 'member', 'status')

admin.site.register(Society, SocietyAdmin)
admin.site.register(SocietyMemberRelationShip, SocietyMemberRelationShipAdmin)