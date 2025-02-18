from django.urls import path
from website import views

urlpatterns = [
    path('', views.home,name='home'),
    path('login.html/', views.loginPage,name='login'),
    path('contact/', views.contactPage,name='contact'),
    path('new_user.html/', views.new_user,name='new-user'),
    path('profile/', views.profileHome,name='profile_home'),
    path('logout/', views.logout_func,name='logout'),
    path('check_username/', views.check_username, name='check_username'),
    path('firm_info/',views.firm_info,name='firm_info'),
    path('feedback/',views.email_send,name='feedback'),
    path('configureOrder/',views.configureOrder,name='configureOrder'),
    path('orderdetails/',views.orderDetails,name="orderdetails"),
    path('help/',views.helpRender,name="help"),
    path('report/',views.reportRender,name="report"),
    path('viewOrder/',views.viewOrderRender,name="viewOrder"),  
]
