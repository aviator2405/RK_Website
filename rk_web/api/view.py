from django.shortcuts import render,redirect,HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from django.http import JsonResponse
from website.serializer import *
from website.models import firm_info,order, order_item
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.mail import EmailMultiAlternatives
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.parsers import JSONParser
import datetime


@api_view(["GET","POST"])
def firmDetails(request,userID):
    if request.method == 'GET':
        obj = firm_info.objects.filter(username=userID)
        print(obj)
        serializers = firm_info_serializers(obj, many=True)
        return Response(serializers.data)
    elif request.method == "POST":
        print ("POST")

# user = 1
@api_view(['GET','POST'])
def get_order(request,userID):
    if request.method == 'GET':
        # obj = order.objects.filter(username = 3)
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



def get_order_details(request, order_id):
    # Fetch the order object using the provided order_id
    order_obj = get_object_or_404(order, id=order_id)

    # Fetch related order items
    order_items = order_item.objects.filter(order_id=order_obj)

    # Prepare the response data
    data = {
        "order_id": order_obj.id,
        # "order_date": order_obj.order_date,  # Replace with the actual field for order date
        "status": order_obj.status,  # Replace with the actual field for status
        "pickup_date": order_obj.order_date,  # Replace with the actual field for pickup date
        "items": [
            {
                "breadth": item.breadth,
                "height": item.height,
                "length": item.length,
                "quantity": item.quantity,
                "category": item.category,
            }
            for item in order_items
        ],
    }
    # print(data["items"])
    return JsonResponse(data)

@csrf_exempt
def create_order(request):
    if request.method == 'POST':
        try:
            data = JSONParser().parse(request)

            # Create the order object
            new_order = order.objects.create(
                username=User.objects.get(username=request.user.username),  # Assuming authenticated user
                order_date=datetime.date.today(),
                status="Requested",
                total_amount=0,  # Total amount can be calculated here or updated later
                firm_name_id=data.get('firm_id')  # Firm ID should be passed in the request
            )

            # Create order items
            for item in data['items']:
                order_item.objects.create(
                    breadth=item['breadth'],
                    height=item['height'],
                    length=item['length'],
                    category=item['color'],
                    quantity=item['quantity'],
                    price=item.get('price', 0),  # Default price to 0 if not provided
                    acceptance=item['purpose'],
                    order_id=new_order
                )

            return JsonResponse({'message': 'Order created successfully!', 'order_id': new_order.id}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=405)