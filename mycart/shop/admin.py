from django.contrib import admin

# Register your models here.
from . models import Product,Contact

class ProductAdmin(admin.ModelAdmin): # new
    readonly_fields = ['img_preview']

admin.site.register(Product,ProductAdmin)
admin.site.register(Contact) 