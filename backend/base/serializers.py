from rest_framework.serializers import *
from .models import *


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class CommentsSerializer(ModelSerializer):
    class Meta:
        model = Comments
        fields = ("id", "creator", "commented_subject", "created", "body", "rate")


class RestaurantSerializer(ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ["city", "name", "address", "phone_number", "tables_quantity"]


class DishSerializer(ModelSerializer):
    restaurant = RestaurantSerializer()

    class Meta:
        model = Dish
        fields = ("id", "price", "name", "restaurant")


class RestaurantDetailSerializer(ModelSerializer):
    dishes = DishSerializer(many=True)
    comments = CommentsSerializer(many=True)

    class Meta:
        model = Restaurant
        fields = [
            "city",
            "name",
            "address",
            "phone_number",
            "tables_quantity",
            "dishes",
            "comments",
        ]


class OrderItemSerializer(ModelSerializer):
    item = SerializerMethodField()
    final_price = SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ("id", "item", "quantity", "final_price")

    def get_item(self, obj):
        return DishSerializer(obj.item).data

    def get_final_price(self, obj):
        return obj.get_final_price()


class OrderSerializer(ModelSerializer):
    order_items = SerializerMethodField()
    total = SerializerMethodField()

    class Meta:
        model = Order
        fields = ("id", "order_items", "total")

    def get_total(self, obj):
        return obj.get_total()

    def get_order_items(self, obj):
        return OrderItemSerializer(obj.items.all(), many=True).data
