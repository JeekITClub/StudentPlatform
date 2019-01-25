from django.contrib import admin
from student.models import Student


# Register your models here.
class StudentAdmin(admin.ModelAdmin):
    list_display = ('name', 'class_num', 'grade', 'user_status')

    def user_status(self, obj):
        return obj.user.is_active


admin.site.register(Student, StudentAdmin)
