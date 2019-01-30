from django.shortcuts import render


def react(request):
    options = '{}'
    if not request.user.is_authenticated:
        return render(request, 'react/index.html', locals())
    return render(request, 'react/index.html', locals())
