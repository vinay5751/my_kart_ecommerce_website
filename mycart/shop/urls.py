from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="ShopHome"),
    path("product/<int:myid>", views.product_view, name="ProductView"),
    path("about_us", views.about_us, name="AboutUs"),
    path("contact_us", views.contact_us, name="ContactUs"),
    path("check_out", views.check_out, name="CheckOut"),
]
