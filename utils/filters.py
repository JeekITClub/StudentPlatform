from rest_framework import filters


class NameFilterBackend(filters.BaseFilterBackend):
    """
    Filter that only allows users to see their own objects.
    """
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
