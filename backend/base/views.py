from django.shortcuts import render
from .models import User, Restaurant
from rest_framework import generics
from .serializers import RestaurantSerializer
from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS
from .permissions import ReadOnly

# Create your views here.


class ListRestaurantsViewset(generics.ListAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer
    # permission_classes = [IsAuthenticated | ReadOnly]
