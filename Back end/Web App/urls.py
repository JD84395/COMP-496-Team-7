from django.urls import path
from .views import get_users, create_user, update_user, main, login, signup, delete_user


urlpatterns = [
    path('users/', get_users, name='get_users'),
    path('users/create', create_user, name='create_user'),
    path('users/<int:pk>', update_user, name='update_user'),
    path('', main, name='main'),
    path('login/', login, name='login'),
    path('signup/', signup, name='signup'),
    path('users/delete', delete_user, name='delete_user')
]
