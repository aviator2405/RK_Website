from django.contrib import admin
from website.models import firm_info,order,order_item,reports
# Register your models here.



class firm_info_admin(admin.ModelAdmin):
    list_display = ["id","username","firm_name", "address", "gstin","phone","email"]
    pass


class orders_admin(admin.ModelAdmin):
    list_display = ["username","order_date","status","total_amount","firm_name"]

class order_item_admin(admin.ModelAdmin):
    list_display = ["id","breadth",'height',"length","category","quantity","price","acceptance","order_id"]

class reports_admin(admin.ModelAdmin):
    list_display = ["id","firm_info","phone","email","message","error_image_url"]

admin.site.register(firm_info, firm_info_admin)
admin.site.register(order,orders_admin)
admin.site.register(order_item,order_item_admin)
admin.site.register(reports,reports_admin)