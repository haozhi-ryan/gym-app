# workout/api/urls.py  (create this file)
from django.urls import path
from . import views

urlpatterns = [
    path("workouts-create/", views.create_workout, name="create_workout"),
    path('workouts/', views.get_workouts),
]
