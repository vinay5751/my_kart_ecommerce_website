from django.http import HttpResponseRedirect
from .models import Product, Contact
from django.shortcuts import render
from .forms import Contact_form


# Create your views here.
def index(request):
    # products = Product.objects.all()
    all_products = []
    product_category = Product.objects.values("category", "id")
    categories = {item["category"] for item in product_category}
    for category in categories:
        products = Product.objects.filter(category=category)
        all_products.append([products, category])

    params = {"all_products": all_products}
    return render(request, "shop/index.html", params)


def product_view(request, myid):
    product = Product.objects.filter(id=myid)
    params = {"product": product[0]}

    return render(request, "shop/product_view.html", params)


def about_us(request):
    return render(request, "shop/about_us.html")


def contact_us(request):
    # if this is a POST request we need to process the form data
    if request.method == "POST":
        # create a form instance and populate it with data from the request:
        form = Contact_form(request.POST)
        print(form)
        # check whether it's valid:
        if form.is_valid():
            contact = Contact()
            contact.name = form.cleaned_data["name"]
            contact.email = form.cleaned_data["email"]
            contact.phone = form.cleaned_data["phone"]
            contact.desc = form.cleaned_data["desc"]
            contact.save()
            form = Contact_form()
            return HttpResponseRedirect("/shop/contact_us")

    # if a GET (or any other method) we'll create a blank form
    else:
        form = Contact_form()

    return render(request, "shop/contact_us.html", {"form": form})


def check_out(request):
    return render(request, "shop/check_out.html")
