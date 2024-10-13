let cartButton = document.getElementsByClassName("cart_button_container")[0];
let cartButtonLabel = document.getElementById("cart_button");

cartButton.style.display = "none";

let cart = []
let cart_subtotal = 0
let cart_total = 0

let cartOverlay = document.getElementById("cart_overlay");
let cartItemTemplate = document.getElementsByClassName("cart_item")[0];
let cartOverlayContainer = document.getElementById("cart_overlay_container");
let cartItemsInContainer = []

cartOverlay.classList.add("cart_overlay_anim_inactive");


function addItemToCart(el) {
    let previousNumInCart = parseInt(cartButtonLabel.innerHTML);
    cartButtonLabel.innerHTML = "" + (previousNumInCart + 1);

    // let headingNodes = el.parentNode.getElementsByClassName("certificate_card_heading");
    // logInfo('Heading nodes:', headingNodes);
    // let heading, img, price;
    //
    // if (headingNodes.length === 0) {
    //     let parent = el.parentNode.parentNode.parentNode.parentNode;
    //     headingNodes = parent.getElementsByClassName("service_card_heading");
    //     heading = headingNodes[0].innerHTML;
    //     img = parent.getElementsByClassName("service_card_img")[0].innerHTML;
    //     price = prepareFloatPrice(parent.getElementsByClassName("service_card_price_value")[0].innerHTML);
    // } else {
    //     heading = headingNodes[0].innerHTML;
    //     img = el.parentNode.getElementsByClassName("certificate_card_img")[0].src;
    //     price = prepareFloatPrice(el.parentNode.getElementsByClassName("certificate_card_price_value")[0].innerHTML);
    // }


    // let certificate = [heading, img, price]

    let parent_node = el.parentNode;
    let product = parent_node.getElementsByClassName("product_id");
    while (product === null || product.length === 0) {
        parent_node = parent_node.parentNode;
        product = parent_node.getElementsByClassName("product_id");
    }
    product = product[0].innerHTML;

    logInfo(product);

    cart.push([parseInt(product[0]), parseInt(product.slice(1))]);
    // cart_subtotal += price;
    logInfo(cart);

    if (cartItemsInContainer.length === 0)
        // showCartButton();
        prepareAndShowCartOverlay();
    else
        refreshCartItems();
}


function prepareFloatPrice(price) {
    return parseFloat(price.replace(/\s/g, ''));
}


function refreshCartItems() {
    clearCartOverlay();
    showCartItems();
    cart_subtotal = 0;
    cart_total = 0;
    setSubtotal(cart_subtotal);
    setTotal(cart_subtotal);
    setCartDict();
}


function logInfo(info) {
    console.log(info);
}


function showCartItems() {
    logInfo(cart);
    for (let i = 0; i < cart.length; i++) {
        if (cart[i][0] === 0) {
            getCertificateCard(cart[i][1]);
        } else {
            getServiceCard(cart[i][1]);
        }
    }
}


function setCartItem(node, item) {
    node.getElementsByClassName("cart_item_img")[0].src = baseImgUrl + item[1];
    node.getElementsByClassName("cart_item_heading")[0].innerHTML = item[0];
    node.getElementsByClassName("cart_item_price_value")[0].innerHTML = prepareStringPrice(item[2]);
    if (item[3] !== null) {
        let list_node = node.getElementsByClassName("cart_item_list_value")[0];

        for (let i = 0; i < item[3].length; i++) {
            let li = document.createElement("li");
            li.innerHTML = item[3][i];
            list_node.appendChild(li);
        }
    }
}


function addItemToCartContainer(item) {
    let cart_item_node = cartItemTemplate.cloneNode(true);
    logInfo('Here we are just before setting cart item');
    let item_img = null;
    let item_list = null;
    try {
        item_list = item['list'];
        if (item_list === undefined) {
            item_list = [item['description']];
            item_img = 'services/' + item['img'];
        }
    } catch (e) {
        item_list = [item['description']];
        item_img = 'services/' + item['img'];
    } finally {
        if (item_img === null) {
            item_img = 'certificates/' + item['img'];
        }
    }

    let item_heading = null;
    try {
        item_heading = item['heading'];
        if (item_heading === undefined) {
            item_heading = item['name'];
        }
    } catch (e) {
        item_heading = item['name'];
    }

    let cart_item = [item_heading, item_img, item['price'], item_list];

    setCartItem(cart_item_node, cart_item);
    cart_subtotal += prepareFloatPrice(item['price']);
    setSubtotal(cart_subtotal);
    setTotal(cart_subtotal);

    cart_item_node.style.display = "block";
    cartOverlayContainer.appendChild(cart_item_node);
    cartItemsInContainer.push(cart_item_node);
}


function prepareAndShowCartOverlay() {
    hideCartButton();
    hideHeader();
    lockMainScreen();
    showCartOverlayWithAnim();
    showCartItems();
    setSubtotal(cart_subtotal);
    setTotal(cart_subtotal);
    setCartDict();
}


function prepareAndHideCartOverlay() {
    unlockMainScreen();
    clearCartOverlay();
    cart = [];
    cartItemsInContainer = [];
    cart_subtotal = 0;
    cart_total = 0;
    showCartButton();
    showHeader();
    hideCartOverlayWithAnim();
}


// Cart overlay anim

function hideCartOverlayWithAnim() {
    cartOverlay.classList.replace("cart_overlay_anim_active", "cart_overlay_anim_inactive");
    setTimeout(hideCartOverlay, 500);
}

function showCartOverlayWithAnim() {
    showCartOverlay();
    cartOverlay.classList.replace("cart_overlay_anim_inactive", "cart_overlay_anim_active");
}


// Cart button

function hideCartButton() {
    cartButton.style.display = "none"
}

function showCartButton() {
    let previousNumInCart = parseInt(cartButtonLabel.innerHTML);
    if (previousNumInCart > 0) {
        // cartButton.style.display = "block";
    }
}


// Cart overlay

function hideCartOverlay() {
    cartOverlay.style.visibility = "collapse";
}

function showCartOverlay() {
    cartOverlay.style.visibility = "visible";
}

function clearCartOverlay() {

    logInfo(cartItemsInContainer);

    for (let i = 0; i < cartItemsInContainer.length; i++) {
        cartItemsInContainer[i].remove();
    }
}


// Price
function prepareStringPrice(price) {
    return price.toLocaleString();
}


// Subtotal
let subtotalElements = document.getElementsByClassName('subtotal_price');

function setSubtotal(price) {
    for (let i = 0; i < subtotalElements.length; i++) {
        subtotalElements[i].innerHTML = prepareStringPrice(price);
    }
}


// Total
let totalElements = document.getElementsByClassName('total_price');

function setTotal(price) {
    for (let i = 0; i < totalElements.length; i++) {
        totalElements[i].innerHTML = prepareStringPrice(price);
    }
}


// Cart dict
let cartDictElement = document.getElementById('cart_dict');

function setCartDict() {
    cartDictElement.setAttribute('value', JSON.stringify(cart));
}


// Get certificate card
function getCertificateCard(certificate_id) {
    getCartItem("get_certificate_card/", certificate_id);
}


// Get service card
function getServiceCard(service_id) {
    getCartItem("get_service_card/", service_id);
}


// Get cart item
function getCartItem(whereToGet, cartItemId) {
    fetch(whereToGet + cartItemId).then(function (response) {
        return response.json();
    }).then(function (data) {
        logInfo(data);
        addItemToCartContainer(data);
    }).catch(function () {
        logInfo("Error");
    });
}