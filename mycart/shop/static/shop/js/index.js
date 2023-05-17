const productContainers = [...document.querySelectorAll(".product-container")];
const nxtBtn = [...document.querySelectorAll(".nxt-btn")];
const preBtn = [...document.querySelectorAll(".pre-btn")];

productContainers.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;

    nxtBtn[i].addEventListener("click", () => {
        item.scrollLeft += containerWidth;
    });

    preBtn[i].addEventListener("click", () => {
        item.scrollLeft -= containerWidth;
    });
});

// Find out cart item in local storage.

if (localStorage.getItem("cart") == null) {
    var cart = {};
} else {
    cart = JSON.parse(localStorage.getItem("cart"));
    update_cart(cart);
}

// If add to cart button is clicked add or increment the item.
$(".divpr").on("click", "button.cart", function () {
    var idstr = this.id.toString();
    if (cart[idstr] != undefined) {
        cart[idstr] = cart[idstr] + 1;
    } else {
        cart[idstr] = 1;
    }

    update_cart(cart);
});

function update_cart(cart) {
    var sum = 0;
    for (var item in cart) {
        sum = sum + cart[item];
        document.getElementById("div" + item).innerHTML =
            "<button id='minus" +
            item +
            "' class = 'minus card-btn'>-</button><span id='val" +
            item +
            "'>" +
            cart[item] +
            "</span> <button id='plus" +
            item +
            "' class='plus card-btn'> + </button>";
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    // document.getElementById("cart").innerHTML = Object.keys(cart).length;
    document.getElementById("cart").innerHTML = sum;
    console.log(cart);
    update_popover(cart);
}

$(".divpr").on("click", "button.minus", function () {
    a = this.id.slice(5);
    cart[a] = cart[a] - 1;
    if (cart[a] <= 0) {
        document.getElementById("div" + a).innerHTML =
            "<button id='" + a + "' class='card-btn cart'>add to cart</button>";
        delete cart[a];
        update_cart(cart);
    } else {
        document.getElementById("val" + a).innerHTML = cart[a];
        update_cart(cart);
    }
});

$(".divpr").on("click", "button.plus", function () {
    a = this.id.slice(4);
    cart[a] = cart[a] + 1;
    document.getElementById("val" + a).innerHTML = cart[a];
    update_cart(cart);
});

update_popover(cart);

function update_popover(cart) {
    console.log("we are inside popover.");
    var popstr = "";
    popstr = popstr + "<h5>Items in cart</h5>";

    var i = 1;

    for (var item in cart) {
        popstr = popstr + "<b>" + i + ". <b/>";
        popstr =
            popstr +
            document.getElementById("name" + item).innerHTML +
            " Qty: " +
            cart[item] +
            "<br>";
        i = i + 1;
    }
    popstr =
        popstr +
        "<button class = 'popup-btn' onclick='clear_cart()'>clear cart</button>";
    popstr = popstr + "<button class = 'popup-btn' >checkout</button>";

    document.getElementById("myPopup").innerHTML = popstr;
}

function clear_cart() {
    cart = JSON.parse(localStorage.getItem("cart"));
    for (var item in cart) {
        document.getElementById("div" + item).innerHTML =
            "<button id='" +
            item +
            "' class='card-btn cart'>add to cart</button>";
    }
    localStorage.clear();
    cart = {};
    update_cart(cart);
}
