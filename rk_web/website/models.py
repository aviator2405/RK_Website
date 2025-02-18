from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class firm_info(models.Model):
    username = models.ForeignKey(User, on_delete=models.SET_DEFAULT, default=None)
    firm_name=models.CharField(max_length=60)
    address= models.CharField(max_length=200)
    gstin= models.CharField(max_length=15)
    phone = models.IntegerField()
    email = models.EmailField()
    
    def __str__(self):
        return self.firm_name
    
class order(models.Model):
    status_CHOICES = [
        ('Requested', 'Requested'),
        ('Accepted', 'Accepted'),
        ('Completed', 'Completed'),
        ('Cancelled', 'Cancelled'),
    ]
    username = models.ForeignKey(User, on_delete=models.CASCADE, default="admin")
    order_date = models.DateField()
    status = models.CharField(max_length=10, choices=status_CHOICES, default='Requested')
    total_amount = models.IntegerField()
    firm_name = models.ForeignKey(firm_info, on_delete=models.CASCADE, default=None)
    
    def __str__(self):
        return str(self.id)

 
class order_item(models.Model):
    categories = [
        ('Colour', 'Colour'),
        ('White', 'White'),
    ]
    breadth = models.FloatField()
    height = models.FloatField()
    length = models.FloatField()
    category= models.CharField(max_length=10, choices=categories, default='Colour')
    quantity = models.IntegerField()
    price = models.IntegerField(default=0)
    acceptance = models.TextField()
    order_id = models.ForeignKey(order,on_delete=models.SET_DEFAULT, default=None)

class user_table(User):
    def __str__(self):
        return str(self.username)
    pass

