"""
URL configuration for COMP496 project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('webapp.urls')),
    path('users/create', include('webapp.urls')),
    path('users/<int:pk>', include('webapp.urls')),
    path('', include('webapp.urls')),
    path('login/', include('webapp.urls')),
    path('signup/', include('webapp.urls')),
    path('users/delete', include('webapp.urls')),
    path('dashboard', include('webapp.urls')),
]
