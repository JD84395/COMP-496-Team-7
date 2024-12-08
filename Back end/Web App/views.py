from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404, render, redirect
from django.contrib import messages
from .models import Users
from .serializer import UserSerializer

def main(request):
    return render(request, 'main.ejs')

def login(request):
    return render(request, 'login.ejs')

def signup(request):
    return render(request, 'signup.ejs')

def dashboard(request):
    return render(request, 'dashboard.ejs')

@api_view(['GET'])
def get_users(request):
    users = Users.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)



@api_view(['POST'])
def create_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_user(request, user_id):
    user = get_object_or_404(Users, pk=user_id)
    serializer = UserSerializer(user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK) 
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_user(request, pk):
    try:
        users = Users.objects.get(pk=pk)

        if users == request.user:
            # Prevent self-deletion
            messages.error(request, "You can't delete your own account.")
            return redirect('profile')
        
        users.delete()
        messages.success(request, "User successfully deleted.")
    except Users.DoesNotExist:
        messages.error(request, "User not found.")

    return redirect('user_list')
