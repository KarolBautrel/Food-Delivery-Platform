from rest_framework.serializers import ModelSerializer
from .models import User, Restaurant


class RestaurantSerializer(ModelSerializer):
    class Meta:
        model = Restaurant
        fields = "__all__"
