from django.db import models
from django.contrib.auth.models import AbstractUser
from .custom_fields import IntegerRangeField

ORDER_STATUS = (
    ("Processed", "Processed"),
    ("On the way", "On the way"),
    ("Delivered", "Delivered"),
)


class User(AbstractUser):
    name = models.CharField(max_length=50, null=True, blank=True)
    email = models.EmailField(max_length=30, null=True, blank=True, unique=True)
    bio = models.TextField(max_length=255, null=True)
    created = models.DateTimeField(auto_now_add=True)

    REQUIRED_FIELDS = ["name", "username"]
    USERNAME_FIELD = "email"

    def __str__(self):
        return self.username

    def get_booked_tables(self):
        booked_tables = [
            {
                "name": i.restaurant.name,
                "date": i.booking_date.strftime("%m/%d/%Y"),
                "quantity": i.tables_quantity,
                "id": i.id,
            }
            for i in self.booker.all()
        ]
        return booked_tables


class Restaurant(models.Model):
    city = models.CharField(max_length=30, null=True, blank=True)
    name = models.CharField(max_length=30)
    address = models.CharField(max_length=45)
    phone_number = models.IntegerField()
    tables_quantity = models.IntegerField()
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)

    def __str__(self):
        return self.name

    def available_tables(self):
        booked_tables_quanity = sum(i.tables_quantity for i in self.restaurant.all())
        availavle_tables = self.tables_quantity - booked_tables_quanity
        return availavle_tables

    def average_rate(self):
        try:
            average_rate = sum(i.rate for i in self.comments.all()) / len(
                self.comments.all()
            )
        except ZeroDivisionError:
            average_rate = 0

        return average_rate


class Dish(models.Model):
    name = models.CharField(max_length=25)
    price = models.IntegerField()
    ingredient = models.CharField(max_length=25)
    description = models.CharField(max_length=35)
    restaurant = models.ForeignKey(
        Restaurant, on_delete=models.CASCADE, related_name="dishes"
    )

    def __str__(self):
        return self.name


class OrderItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    item = models.ForeignKey(Dish, on_delete=models.CASCADE, null=True, blank=True)
    ordered = models.BooleanField(default=False)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.user.id} {self.item.name} {self.quantity}"

    def get_total_item_price(self):
        return self.quantity * self.item.price

    def get_final_price(self):
        return self.get_total_item_price()

    class Meta:
        ordering = ["id"]


class Order(models.Model):
    status = models.CharField(default="Processed", choices=ORDER_STATUS, max_length=25)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    items = models.ManyToManyField(OrderItem)
    ordered = models.BooleanField(default=False)
    shipping_address = models.ForeignKey(
        "Address",
        related_name="shipping_address",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )
    start_date = models.DateTimeField(auto_now_add=True)
    ordered_date = models.DateTimeField()
    coupon = models.ForeignKey(
        "Coupon", on_delete=models.SET_NULL, blank=True, null=True
    )

    def __str__(self):
        return f"{self.shipping_address} {self.status}"

    def get_total(self):
        total = 0
        for order_item in self.items.all():
            total += order_item.get_final_price()
        if self.coupon:
            total -= self.coupon.amount
        return total


class Address(models.Model):
    street_address = models.CharField(max_length=100)
    apartment_address = models.CharField(max_length=100)

    def __str__(self):
        return f" {self.street_address} "


class Comments(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    commented_subject = models.ForeignKey(
        Restaurant, on_delete=models.CASCADE, related_name="comments"
    )
    created = models.DateTimeField(auto_now_add=True)
    body = models.TextField(max_length=255)
    rate = IntegerRangeField(min_value=1, max_value=50)

    def __str__(self):
        return f"{self.creator} to {self.commented_subject}"


class TableBooking(models.Model):
    booker = models.ForeignKey(User, on_delete=models.CASCADE, related_name="booker")
    restaurant = models.ForeignKey(
        Restaurant, on_delete=models.CASCADE, related_name="restaurant"
    )
    tables_quantity = models.IntegerField(blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    booking_date = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f"{self.booker.name} to {self.restaurant.name} on {self.created}"


class Coupon(models.Model):
    code = models.CharField(max_length=15, null=False, blank=True)
    amount = models.FloatField(null=False, blank=True)
    is_used = models.BooleanField(null=False, blank=True, default=False)

    def __str__(self):
        return self.code
