from django.shortcuts import render, redirect
from django.http import JsonResponse


def home(request):
    return render(request, 'smap/home.html')


def hakodate_mock(reqest):
    return JsonResponse({"": ""})
