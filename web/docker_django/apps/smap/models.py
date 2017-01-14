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


class Sumari(models.Model):
    tags = models.ManyToManyField(Tag)
    name = models.CharField(max_length=32)
    message = models.CharField(max_length=140)
    lat = models.DecimalField(max_digits=9, decimal_places=6)
    lng = models.DecimalField(max_digits=9, decimal_places=6)
