from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(User)
admin.site.register(Restaurant)
admin.site.register(Dish)
admin.site.register(OrderItem)
admin.site.register(Order)
admin.site.register(Address)
admin.site.register(Comments)
admin.site.register(TableBooking)
