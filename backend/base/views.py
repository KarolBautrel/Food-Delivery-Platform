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
from django_filters.rest_framework import DjangoFilterBackend
from .tasks import booking_mail_sender
from datetime import datetime


class RetrieveCurrentUserView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_object(self):
        obj = User.objects.get(id=self.request.user.id)
        return obj


class ListRestaurantsViewset(generics.ListAPIView):
    queryset = Restaurant.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RestaurantSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["city", "name"]


class RetrieveRestaurantViewset(generics.RetrieveAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantDetailSerializer


class DishDetailViewset(generics.RetrieveAPIView):
    queryset = Dish.objects.all()
    serializer_class = DishSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["name"]


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


class BookTableView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        try:
            restaurant_id = request.data.get("restaurant", None)
            tables_quantity = int(request.data.get("tables_quantity", None))
        except ValueError:
            return Response({"Message": "Restauran doesnt exist"})
        restaurant_qs = Restaurant.objects.filter(id=restaurant_id)
        if restaurant_qs.exists:
            restaurant = restaurant_qs.first()
            if restaurant.tables_quantity >= tables_quantity:
                restaurant.tables_quantity -= tables_quantity
                restaurant.save()
                TableBooking.objects.create(
                    booker=request.user,
                    restaurant=restaurant,
                    tables_quantity=tables_quantity,
                )
                booking_mail_sender.delay(
                    request.user.email, restaurant.name, datetime.now(), tables_quantity
                )
                return Response({"Message": "success"}, status=HTTP_200_OK)
            else:
                return Response(
                    {"Message": "There is no enough tables"}, status=HTTP_200_OK
                )
        else:
            Response(
                {"Message": "Restaurant does not exist"}, status=HTTP_400_BAD_REQUEST
            )


class FinishTableReservationView(APIView):
    permission_classes = (TableBookerAllow,)

    def delete(self, request, *args, **kwargs):
        try:
            table_id = request.data.get("table", None)
        except ValueError:
            return Response({"Message": "Restauran doesnt exist"})
        table_qs = TableBooking.objects.filter(booker=request.user.id, id=table_id)
        if table_qs.exists():
            table = table_qs.first()
            restaurant = Restaurant.objects.get(id=table.restaurant.id)
            restaurant.tables_quantity += table.tables_quantity
            restaurant.save()
            table.delete()
            return Response({"Message": "success"}, status=HTTP_200_OK)
        else:
            Response(
                {"Message": "Table does not exist or youre not a booker"},
                status=HTTP_400_BAD_REQUEST,
            )
        return Response(
            {"Message": "Table does not exist"}, status=HTTP_400_BAD_REQUEST
        )


class ActivateCouponView(APIView):
    def put(self, request, *args, **kwargs):
        try:
            order_id = request.data.get("order", None)
            coupon_code = request.data.get("coupon", None)
        except:
            return Response(
                {"Message": "You didnt provide correct data"},
                status=HTTP_400_BAD_REQUEST,
            )
        try:
            coupon = Coupon.objects.get(code=coupon_code, is_used=False)
        except:
            return Response(
                {"Message": "Coupon does not exists"},
                status=HTTP_400_BAD_REQUEST,
            )

        order_qs = Order.objects.filter(id=order_id)
        if order_qs.exists():
            order = order_qs.first()
            print(order)
            order.coupon = coupon
            coupon.is_used = True
            coupon.save()
            order.save()
            return Response(
                {"Message": "Success"},
                status=HTTP_200_OK,
            )
        else:
            return Response(
                {"Message": "Order does not exists"},
                status=HTTP_400_BAD_REQUEST,
            )
