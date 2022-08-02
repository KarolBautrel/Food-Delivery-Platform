from calendar import c
from urllib.error import HTTPError
from django.shortcuts import render
from .models import *
from rest_framework import generics
from .serializers import *
from rest_framework.permissions import IsAuthenticated, SAFE_METHODS, AllowAny
from .permissions import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import render, get_object_or_404
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST


class ListRestaurantsViewset(generics.ListAPIView):
    queryset = Restaurant.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RestaurantSerializer


class RetrieveRestaurantViewset(generics.RetrieveAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantDetailSerializer


class DishDetailViewset(generics.RetrieveAPIView):
    queryset = Dish.objects.all()
    serializer_class = DishSerializer


class AddToCartView(APIView):

    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        try:
            product_id = request.data.get("product", None)
        except ValueError:
            return Response({"Message": "Product doenst exist"})
        item = get_object_or_404(
            Dish,
            id=product_id,
        )

        order_item_qs = OrderItem.objects.filter(
            item=item, user=request.user, ordered=False
        )

        if order_item_qs.exists():
            order_item = order_item_qs.first()
            order_item.quantity += 1
            order_item.save()
        else:
            order_item = OrderItem.objects.create(
                item=item, user=request.user, ordered=False
            )
            order_item.save()
        order_qs = Order.objects.filter(user=request.user, ordered=False)
        if order_qs.exists():
            order = order_qs[0]
            if not order.items.filter(item__id=order_item.id).exists():
                order.items.add(order_item)
                return Response({"Message": "success"}, status=HTTP_200_OK)
        else:
            ordered_date = timezone.now()
            order = Order.objects.create(user=request.user, ordered_date=ordered_date)
            order.items.add(order_item)
            return Response({"Message": "success"}, status=HTTP_200_OK)
        return Response({"Message": "success"}, status=HTTP_200_OK)


class UpdateOrderQuantity(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        product_id = request.data.get("product", None)

        if product_id is None:
            return Response({"Message": "Product doenst exist"})

        item = get_object_or_404(
            Dish,
            id=product_id,
        )

        order_qs = Order.objects.filter(user=request.user, ordered=False)
        if order_qs.exists():
            order = order_qs[0]
            if order.items.filter(item__id=item.id).exists():
                order_item = OrderItem.objects.filter(
                    item=item, user=request.user, ordered=False
                )[0]
                if order_item.quantity > 1:
                    order_item.quantity -= 1
                    order_item.save()
                else:
                    order.items.remove(order_item)
                    order_item.delete()
                return Response(status=HTTP_200_OK)
            else:
                return Response(
                    {"message": "This item was not in your cart"},
                    status=HTTP_400_BAD_REQUEST,
                )

        else:
            return Response(
                {"message": "You do not have an active order"},
                status=HTTP_400_BAD_REQUEST,
            )


class OrderItemCartDetailView(generics.ListAPIView):

    queryset = OrderItem.objects.all()
    permission_classes = (IsAuthenticated,)

    serializer_class = OrderItemSerializer

    def get_queryset(self):
        queryset = OrderItem.objects.filter(user=self.request.user)
        return queryset


class OrderDetailView(generics.ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        queryset = Order.objects.filter(user=self.request.user)
        return queryset


class CommentsCreateView(generics.CreateAPIView):
    queryset = Comments.objects.all()
    serializer_class = CommentsSerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)


class CommentDetailView(generics.RetrieveAPIView):
    queryset = Comments.objects.all()
    serializer_class = CommentsSerializer


class CommentDestroyView(generics.DestroyAPIView):
    queryset = Comments.objects.all()
    permission_classes = (IsAuthenticated,)

    serializer_class = CommentsSerializer


class CommentUpdateView(generics.UpdateAPIView):
    queryset = Comments.objects.all()
    permission_classes = (ContentCreatorAllow,)
    serializer_class = CommentsUpdateSerializer


class CommentListView(generics.ListAPIView):
    queryset = Comments.objects.all()
    serializer_class = CommentsSerializer
