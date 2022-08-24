from django.urls import path
from .views import *

urlpatterns = [
    path("auth/login", LoginView.as_view()),
    path("me", RetrieveCurrentUserView.as_view()),
    path(
        "user/change_email/<int:pk>",
        UserChangeEmailView.as_view(),
    ),
    path("restaurants", ListRestaurantsViewset.as_view()),
    path("restaurant/<int:pk>", RetrieveRestaurantViewset.as_view()),
    path("dish/<int:pk>", DishDetailViewset.as_view()),
    path("cart", OrderItemCartDetailView.as_view()),
    path("cart/add-coupon", ActivateCouponView.as_view()),
    path("cart/add-to-cart", AddToCartView.as_view()),
    path("cart/remove-item", RemoveProductFromCartView.as_view()),
    path("order-summary", OrderDetailView.as_view()),
    path("cart/remove-from-cart", RemoveFromCartView.as_view()),
    path("order-summary/complete-checkout", CompleteCheckout.as_view()),
    path("comments", CommentListView.as_view()),
    path("comment/create", CommentsCreateView.as_view()),
    path("comment/<int:pk>", CommentDetailView.as_view()),
    path("comment/delete/<int:pk>", CommentDestroyView.as_view()),
    path("comment/update/<int:pk>", CommentUpdateView.as_view()),
    path("booking/book-table", BookTableView.as_view()),
    path("booking/delete-table", CancelTableReservationView.as_view()),
    path("create-checkout-session/<pk>", CreateStripeCheckoutSession.as_view()),
]
