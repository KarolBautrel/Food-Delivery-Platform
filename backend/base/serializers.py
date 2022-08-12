from rest_framework.serializers import *
from .models import *


class UserSerializer(ModelSerializer):
    booked_tables = SerializerMethodField()

    class Meta:
        model = User
        fields = ("id", "name", "email", "username", "booked_tables")

    def get_booked_tables(self, obj):
        return obj.get_booked_tables()


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
    restaurant = StringRelatedField()

    class Meta:
        model = Dish
        fields = ("id", "price", "name", "ingredient", "restaurant")


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


class AddressSerializer(ModelSerializer):
    class Meta:
        model = Address
        fields = ("street_address", "apartment_address")


class CouponSerializer(ModelSerializer):
    class Meta:
        model = Coupon
        fields = ("amount", "code")


class OrderItemSerializer(ModelSerializer):
    item = SerializerMethodField()
    final_price = SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ("id", "item", "quantity", "final_price", "user")

    def get_item(self, obj):
        return DishSerializer(obj.item).data

    def get_final_price(self, obj):
        return obj.get_final_price()


class OrderSerializer(ModelSerializer):
    order_items = SerializerMethodField()
    total = SerializerMethodField()
    shipping_address = AddressSerializer()
    coupon = CouponSerializer()

    class Meta:
        model = Order
        fields = ("id", "order_items", "total", "shipping_address", "coupon")

    def get_total(self, obj):
        return obj.get_total()

    def get_order_items(self, obj):
        return OrderItemSerializer(obj.items.all(), many=True).data


class EmailChangeSerializer(ModelSerializer):

    re_email = EmailField()

    class Meta:
        model = User
        fields = ["email", "re_email"]

    def validate(self, data):
        if data["email"] == data["re_email"]:
            return data
        else:
            raise ValidationError("Emails needs to be the same")
