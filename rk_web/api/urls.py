from django.contrib import admin
from django.urls import path
# from website import views
from api import view

urlpatterns = [
    path('firm/<int:userID>/', view.firmDetails,name='home'),
    path('order/<int:userID>/', view.get_order,name='get_order'),   
    path('emailverfication/', view.emailverfication,name='emailverfication'),
    path('order/details/<int:order_id>/', view.get_order_details, name='get_order_details'),
    path('placeOrders/', view.create_order, name='create_order'),
]
