from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Users


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = [ 
            'name',
            'email',
            'password',
        ]
        extra_kwargs = {
            "password": {"write_only": True},
            "user_id": {"read_only": True}, 
        }

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)