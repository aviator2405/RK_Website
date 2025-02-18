from django.contrib import admin
from django.urls import path
# from website import views
from api import view

urlpatterns = [
    path('firm/<int:userID>/', view.firmDetails,name='home'),
    path('order/<int:userID>/', view.get_order,name='get_order'),   
    path('emailverfication/', view.emailverfication,name='emailverfication'),   
]
