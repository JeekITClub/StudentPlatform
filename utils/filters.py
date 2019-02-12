from rest_framework import filters


class NameFilterBackend(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        name = request.query_params.get('name', None)
        if name:
            return queryset.filter(name__contains=name)
        return queryset


class StatusFilterBackend(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        status = request.query_params.get('status', None)
        if status:
            return queryset.filter(status=status)
        return queryset


class TypeFilterBackend(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        jp_type = request.query_params.get('type', None)
        if jp_type:
            return queryset.filter(type=jp_type)
        return queryset


class CreditNameFilterBackend(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        name = request.query_params.get('name', None)
        if name:
            return queryset.filter(society__name__icontains=name)
        return queryset


class YearFilterBackend(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        year = request.query_params.get('year', None)
        if year:
            return queryset.filter(year=year)
        return queryset


class SemesterFilterBackend(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        semester = request.query_params.get('semester', None)
        if semester:
            return queryset.filter(semester=semester)
        return queryset
