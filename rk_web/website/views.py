from django.shortcuts import render,redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .models import firm_info as firmTable
from django.core.mail import EmailMultiAlternatives
user=""
password =""
userID = 0
username=""
g_username = ""

# Create your views here.
def home(request):
    return render(request,'index.html')

def loginPage(request):
    if request.method == "GET":
        print("get hello")
    if request.method == "POST":
        print("hello post")
        firmname=request.POST.get('firm_name')
        address=request.POST.get('address')
        gstin=request.POST.get('gstin')
        phone=request.POST.get('phone')
        email=request.POST.get('email')
        newuser = User.objects.create_user(username=user, email=email, password=password,first_name=firmname)
        new_entry = firmTable(username=newuser, firm_name=firmname,address=address,gstin=gstin,phone=phone,email=email)
        new_entry.save()
    return render(request,'login.html',{'message':''})

def new_user(request):
    return render(request,'new_user.html')


def profileHome(request):
    global userID,g_username
    if request.method=='POST':
        username=request.POST.get('username')
        password=request.POST.get('password')
        remember_me = request.POST.get('remember_me')
        print(username)
        # print(password)
        user = authenticate(username=str(username), password=str(password))
        print(user)
        if user is not None:
            login(request,user)
            user = User.objects.get(username=username)
            userID = user.id
            g_username = user.username
            if not remember_me:
                # Session will expire when the user closes the browser
                request.session.set_expiry(0)
            else:
                # Set the session to expire after 2 weeks
                request.session.set_expiry(1209600)

            # print(userID_id)
            
            return render(request,'profile_home.html',{'email_status':"","userID":user.id,"username":user.username})
        else:
            return render(request,"login.html",{'message':'invalid credentials'})
            pass
    
    elif request.method == "GET":
        return render(request,'profile_home.html',{'email_status':"","userID":userID,"username":g_username})

def logout_func(request):
    
    logout(request)
    return render(request,"login.html")

def check_username(request):
    username = request.GET.get('username', None)
    data = {
        'is_taken': User.objects.filter(username__iexact=username).exists()
    }
    return JsonResponse(data)

def firm_info(request):
    global user
    global password
    if request.method =="POST":
        user = request.POST.get("username_entry")
        password = request.POST.get("password_entry")
        print (user,",",password)
    return render(request,'personal_info.html')

def email_send(request):
    global userID
    if request.method == "POST":
        firmname=request.POST.get("firmname")
        phone=request.POST.get("phone")
        email=request.POST.get("email")
        message= request.POST.get("message")
        subject = "This is a Feedback Message"
        from_email = "rkwebemail.com"
        # test_email="priyasaini1373@gmail.com"
        to = [email, "rkwebemail@gmail.com"]
        html_content = f"<h1><b>Comfirmation Mail</b></h1><br><br><p>Thankyou for your valuable feedback. We will surely look into it. </p><br><br><h2><b><u>Details Entered -</b></u><br></h2>Firm_name - {firmname}<br>Phone Number - {phone}<br>Email - {email}<br>Message -{message} <br><br><br><h2><b>Thanking You</b></h2><br><br><br><b><u><h3>Regards</h3></u></b>M/s R.K. Patel and Company<br>+91-9424372014, +91-9424712014<br>rkwebemail@gmail.com"
        msg = EmailMultiAlternatives(subject, html_content, from_email, to)
        msg.content_subtype='html'
        msg.send()
        return render(request,"profile_home.html",{'email_status':"Email Sent","userID":userID})

def configureOrder(request):
    user = User.objects.get(id=userID)
    print (user.username)
    return render(request,"configureOrder.html",{"username":g_username})

def contactPage(request):
    return render(request,"contact.html")

def orderDetails(request):
    global userID, user
    print(userID)
    return render(request,"orderPage.html", {"userID":userID, "username":g_username})

def helpRender(request):
    return render(request,"help.html")

def reportRender(request):
    global g_username
    return render(request,"reportError.html",{"username":g_username})

def viewOrderRender(request):
    return render(request,"viewOrder.html")