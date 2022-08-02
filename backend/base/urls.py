from django.urls import path
from .views import *

urlpatterns = [
    path("restaurants", ListRestaurantsViewset.as_view()),
    path("restaurant/<int:pk>", RetrieveRestaurantViewset.as_view()),
    path("dish/<int:pk>", DishDetailViewset.as_view()),
    path("cart", OrderItemCartDetailView.as_view()),
    path("add-to-cart", AddToCartView.as_view()),
    path("order-summary", OrderDetailView.as_view()),
    path("order-summary/update-quantity", UpdateOrderQuantity.as_view()),
    path("comments", CommentListView.as_view()),
    path("comment/create", CommentsCreateView.as_view()),
    path("comment/<int:pk>", CommentDetailView.as_view()),
    path("comment/delete/<int:pk>", CommentDestroyView.as_view()),
    path("comment/update/<int:pk>", CommentUpdateView.as_view()),
]
