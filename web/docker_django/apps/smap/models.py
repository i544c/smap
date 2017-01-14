from django.db import models

class Tag(models.Model):
    name = models.CharField(max_length=16)

    @staticmethod
    def get_or_create(name):
        tag = Tag.objects.filter(name=name)
        if tag:
            return tag.first()
        else:
            tag = Tag(name=name)
            tag.save()
            return tag

    def __str__(self):
        return self.name


class Sumari(models.Model):
    tags = models.ManyToManyField(Tag)
    name = models.CharField(max_length=32)
    message = models.CharField(max_length=140)
    lat = models.DecimalField(max_digits=9, decimal_places=6)
    lng = models.DecimalField(max_digits=9, decimal_places=6)
    good = models.IntegerField(default=0)


    def to_json(self):
        obj = {
            "id": self.id,
            "name": self.name,
            "position": {
                "lat": float(self.lat),
                "lng": float(self.lng)
            },
            "message": self.message,
            "tags": [
                tag.name for tag in self.tags.all()
            ],
            "good": self.good
        }
        return obj

    @staticmethod
    def search_with_tags(tags: list=None, to_json=False):
        objects = Sumari.objects.filter(tags__name__in=tags)
        if to_json:
            return [sumari.to_json() for sumari in objects]
        else:
            return objects

    def __str__(self):
        return "「" + self.message + "」" + " " + ",".join(str(tag)for tag in self.tags.all())
