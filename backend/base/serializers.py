from rest_framework.serializers import *
from .models import *


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "name", "email")


class CommentsSerializer(ModelSerializer):
    creator = UserSerializer(read_only=True)
    restaurant = SerializerMethodField(read_only=True)

    class Meta:

        model = Comments
        fields = ("id", "restaurant", "body", "rate", "creator", "commented_subject")

    def get_restaurant(self, obj):
        return obj.commented_subject.name


class CommentsUpdateSerializer(ModelSerializer):
    class Meta:
        model = Comments
        fields = ("id", "body", "rate")


class RestaurantSerializer(ModelSerializer):
    available_tables = SerializerMethodField()
    comments = CommentsSerializer(many=True)
    avg_rate = SerializerMethodField()

    class Meta:
        model = Restaurant
        fields = (
            "id",
            "city",
            "name",
            "address",
            "phone_number",
            "tables_quantity",
            "available_tables",
            "comments",
            "avg_rate",
        )

    def get_available_tables(self, obj):
        return obj.available_tables()

    def get_avg_rate(self, obj):
        return obj.average_rate()


class DishSerializer(ModelSerializer):
    class Meta:
        model = Dish
        fields = ("id", "price", "name", "ingredient")


class DishDetailSerializer(ModelSerializer):
    class Meta:
        model = Dish
        fields = ("id", "price", "name", "description", "ingredient")


class RestaurantDetailSerializer(ModelSerializer):
    dishes = DishSerializer(many=True)
    comments = CommentsSerializer(many=True)
    available_tables = SerializerMethodField()
    avg_rate = SerializerMethodField()

    class Meta:
        model = Restaurant
        fields = [
            "id",
            "city",
            "name",
            "address",
            "phone_number",
            "tables_quantity",
            "dishes",
            "comments",
            "available_tables",
            "avg_rate",
            "latitude",
            "longitude",
        ]

    def get_available_tables(self, obj):
        return obj.available_tables()

    def get_avg_rate(self, obj):
        return obj.average_rate()


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
