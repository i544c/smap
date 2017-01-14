import json

from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Tag, Sumari

def home(request):
    return render(request, 'smap/home.html')

@csrf_exempt
def smari(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode("utf-8"))
        print(data)
        try:
            name = data["name"]
            message = data["message"]
            lat = data["position"]["lat"]
            lng = data["position"]["lng"]
            tags = data["tags"]
        except KeyError as e:
            return JsonResponse({"status": str(e)})

        try:
            new_sumari = Sumari(name=name, message=message, lat=lat, lng=lng)
            new_sumari.save()
            for tagname in tags:
                tag = Tag.get_or_create(tagname)
                new_sumari.tags.add(tag)
            new_sumari.save()

        except Exception as e:
            return JsonResponse({"status": str(e)})
    return JsonResponse({"status": "ok"})


def hakodate_mock(reqest):
    return JsonResponse({"": ""})
