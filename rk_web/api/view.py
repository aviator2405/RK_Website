from django.shortcuts import render,redirect,HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from django.http import JsonResponse
from website.serializer import *
from website.models import firm_info
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.mail import EmailMultiAlternatives

@api_view(["GET","POST"])
def firmDetails(request,userID):
    if request.method == 'GET':
        obj = firm_info.objects.filter(username=userID)
        print(obj)
        serializers = firm_info_serializers(obj, many=True)
        return Response(serializers.data)
    elif request.method == "POST":
        print ("POST")

user = 1
@api_view(['GET','POST'])
def get_order(request,userID):
    if request.method == 'GET':
        obj = order.objects.filter(username = userID)
        serializer = order_serializers(obj, many=True)
        return Response(serializer.data)
    pass


@api_view(["POST"])
def emailverfication(request):
    if request.method == "POST":
        email=request.POST.get("email")
        otp = request.POST.get("otp")
        print(email,otp)
        subject = "Email Verfication OTP"
        from_email = "rkwebemail.com"
        # test_email="priyasaini1373@gmail.com"
        to = [email, "rkwebemail@gmail.com"]
        html_content = f"<h1><b>EMAIL VERFICATION MAIL</b></h1><br><br><p>The OTP for Email Verfication is - <b>{otp}</b> </p><br><br><h3>Thanking You For choosing<b><i>  RK PATEL AND COMPANY  </I></b> as your wood supplier.</h3><br><br><br><b><u><h3>Regards</h3></u></b>M/s R.K. Patel and Company<br>+91-9424372014, +91-9424712014<br>rkwebemail@gmail.com"
        msg = EmailMultiAlternatives(subject, html_content, from_email, to)
        msg.content_subtype='html'
        msg.send()
    return Response({"message":"email sent"})