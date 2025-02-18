from .models import *
from rest_framework import serializers
from django.contrib.auth.models import User

class firm_info_serializers(serializers.ModelSerializer):
    class Meta:
        model = firm_info
        fields = '__all__'

class order_serializers(serializers.ModelSerializer):
    class Meta:
        model = order
        fields = '__all__'

class order_item_serializers(serializers.ModelSerializer):
    class Meta:
        model = order_item
        fields = '__all__'