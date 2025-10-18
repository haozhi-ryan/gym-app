from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Workout
from .serializers import WorkoutSerializer
import requests

# Create your views here.
@api_view(['POST'])
def create_workout(request):
    token = request.headers.get('Authorization')
    if not token:
        return Response({'error': 'Missing token'}, status=401)

    # Forward the SAME header you received (it already has "Bearer ")
    auth_response = requests.get(
        "http://127.0.0.1:8000/api/user/",
        headers={"Authorization": token}
    )
    if auth_response.status_code != 200:
        return Response({'error': 'Invalid token'}, status=401)

    user_data = auth_response.json()

    # Merge the user id into the payload
    data = request.data.copy()
    data['user'] = user_data['id']

    serializer = WorkoutSerializer(data=data)   # <-- use `data`, not request.data
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
def get_workouts(request):
    token = request.headers.get('Authorization')
    if not token:
        return Response({'error': 'Missing token'}, status=401)

    # Ask the Auth service who the user is
    auth_response = requests.get(
        "http://127.0.0.1:8000/api/user/",
        headers={"Authorization": token}
    )

    if auth_response.status_code != 200:
        return Response({'error': 'Invalid token'}, status=401);
    
    user_data = auth_response.json();
    workouts = Workout.objects.filter(user_id=user_data["id"]);
    serializer = WorkoutSerializer(workouts, many=True);

    return Response(serializer.data);

@api_view(['DELETE'])
def delete_workout(request, pk):
    token = request.headers.get("Authorization")
    if not token:
        return Response({'error': 'Missing token'}, status=401)

    auth_response = requests.get(
        "http://127.0.0.1:8000/api/user/",
        headers={"Authorization": token}
    )
    if auth_response.status_code != 200:
        return Response({'error': 'Invalid token'}, status=401)

    user_data = auth_response.json()
    try:
        workout = Workout.objects.get(id=pk, user_id=user_data["id"])
    except Workout.DoesNotExist:
        return Response({'error': 'Workout not found'}, status=404)

    workout.delete()
    return Response(status=204)
