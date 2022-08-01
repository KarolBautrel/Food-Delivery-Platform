from django.urls import path
from .views import ListRestaurantsViewset

urlpatterns = [path("restaurants", ListRestaurantsViewset.as_view())]
