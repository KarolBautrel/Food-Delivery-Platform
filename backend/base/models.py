from django.db import models
from django.contrib.auth.models import AbstractUser


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


class Restaurant(models.Model):
    city = models.CharField(max_length=30, null=True, blank=True)
    name = models.CharField(max_length=30)
    address = models.CharField(max_length=45)
    phone_numer = models.IntegerField()
    tables_quantity = models.IntegerField()

    def __str__(self):
        return self.name


class Dish(models.Model):
    name = models.CharField(max_length=25)
    price = models.IntegerField()
    ingredient = models.CharField(max_length=25)
    description = models.CharField(max_length=35)
    restaurant = models.ForeignKey(
        Restaurant, related_name="dishes", on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name


class OrderItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    ordered = models.BooleanField(default=False)
    product = models.ForeignKey(Dish, on_delete=models.CASCADE)
    quantity = models.IntegerField(null=True, blank=True, default=1)

    def __str__(self):
        return f"{self.user.name} {self.product.name} {self.quantity}"


class Order(models.Model):
    dish = models.ManyToManyField(OrderItem, blank=True)
    status = models.CharField(default="Processed", choices=ORDER_STATUS, max_length=25)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    billing_address = models.ForeignKey(
        "Address",
        related_name="billing_address",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )
    shipping_address = models.ForeignKey(
        "Address",
        related_name="shipping_address",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )

    def __str__(self):
        return f"{self.billing_address} {self.status}"


class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    street_address = models.CharField(max_length=100)
    apartment_address = models.CharField(max_length=100)
    zip = models.CharField(max_length=100)
    default = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} with {self.street_address} "
