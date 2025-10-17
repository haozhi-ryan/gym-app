from django.db import models
from django.contrib.auth.models import User

class Workout(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    weight = models.FloatField()
    sets = models.IntegerField()

    def __str__(self):
        return f"{self.name} - {self.weight}kg x {self.sets} sets"