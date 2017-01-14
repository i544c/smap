from django.test import TestCase
from .models import Tag, Sumari

class Test(TestCase):

    def create_data(self, data):
        for sumari in data:
            message = sumari["message"]
            name = sumari["name"]
            lat = sumari["lat"]
            lng = sumari["lng"]
            new_sumari = Sumari(name=name, message=message, lat=lat, lng=lng)
            new_sumari.save()
            for tagname in sumari["tags"]:
                tag = Tag.get_or_create(tagname)
                new_sumari.tags.add(tag)
                new_sumari.save()


    def test_search_sumaris_by_tag(self):
        data = [
            {
                "tags": {
                    "meshi",
                    "ramen"
                },
                "name": "山岡屋",
                "message": "山岡屋うまい",
                "lat": 41.773809,
                "lng": 140.726467,
            },
            {
                "tags": {
                    "meshi",
                    "sushi"
                },
                "name": "すしろー",
                "message": "すしうまい",
                "lat": 41.773809,
                "lng": 140.726467,
            },
            {
                "tags": {
                    "sushi"
                },
                "name": "すしろー",
                "message": "回転寿司うまい",
                "lat": 41.773809,
                "lng": 140.726467,

            },
            {
                "tags": {
                    "sushi"
                },
                "name": "すしろー",
                "message": "うまい",
                "lat": 41.773809,
                "lng": 140.726467,

            }
        ]
        self.create_data(data)

        self.assertEqual(len(Sumari.objects.filter(tags__name__in=["meshi"])), 2)
        self.assertEqual(len(Sumari.objects.filter(tags__name__in=["ramen"])), 1)
        self.assertEqual(len(Sumari.objects.filter(tags__name__in=["sushi"])), 3)
        self.assertEqual(len(Sumari.objects.filter(tags__name__in=["ramen", "sushi"])), 4)

    def test_search_with_tags_not_exist(self):
        data = [
            {
                "tags": {
                    "meshi",
                    "ramen"
                },
                "name": "山岡屋",
                "message": "山岡屋うまい",
                "lat": 41.773809,
                "lng": 140.726467,
            },
            {
                "tags": {
                    "meshi",
                    "sushi"
                },
                "name": "すしろー",
                "message": "すしうまい",
                "lat": 41.773809,
                "lng": 140.726467,
            },
            {
                "tags": {
                    "sushi"
                },
                "name": "すしろー",
                "message": "回転寿司うまい",
                "lat": 41.773809,
                "lng": 140.726467,

            },
            {
                "tags": {
                    "sushi"
                },
                "name": "すしろー",
                "message": "うまい",
                "lat": 41.773809,
                "lng": 140.726467,

            }
        ]
        self.create_data(data)

        self.assertEqual(len(Sumari.objects.filter(tags__name__in=["USA"])), 0)
        self.assertEqual(len(Sumari.objects.filter(tags__name__in=["---", "0000"])), 0)
