export let cart;

loadFromStorage()

export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart'));

    if (!cart) {
        cart = [
            {
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 2,
                deliveryOptionid: '1'
            }, {
                productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 1,
                deliveryOptionid: '2'
            }
        ];
    }
}


// export let cart = [
//     {
//         productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
//         quantity: 2
//     }, {
//         productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
//         quantity: 1
//     }
// ];

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
    const newQuantityToBeAdded = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

    // Only For Tests
    // const newQuantityToBeAdded =1;
    

    let matchingItem;

    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem
        }
    })

    if (matchingItem) {
        matchingItem.quantity += newQuantityToBeAdded;
    }
    else {
        cart.push({
            productId: productId,
            quantity: newQuantityToBeAdded,
            deliveryOptionid: '1'
        });
    }

    saveToStorage();
}

export function calculateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
}

export function updateCartQuantity(productId) {
    let cartQuantity = calculateCartQuantity();

    console.log(cart)

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;


    let addedMessageTimeoutId;

    document.querySelector(`.js-added-to-cart-${productId}`).classList.add('visible-added-to-cart');

    if (addedMessageTimeoutId) {
        clearTimeout(myTimeout);
    }

    const myTimeout = setTimeout(() => {
        document.querySelector(`.js-added-to-cart-${productId}`).classList.remove('visible-added-to-cart');
    }, 2000);

    addedMessageTimeoutId = myTimeout;
    saveToStorage()
}

export function removeFromCart(productId) {
    let newcart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newcart.push(cartItem)
        }
    })

    cart = newcart;
    saveToStorage()
}

export function updateCartItemQuantityIncheckout(cartItemNewQuantity, productId) {
    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            cartItem.quantity = cartItemNewQuantity;
        }
    })
    saveToStorage()
}

export function updateDeliveryOption(matchingProductId, deliveryOptionid) {

    cart.forEach((cartItem) => {
        if (cartItem.productId === matchingProductId) {
            cartItem.deliveryOptionid = deliveryOptionid;
        }
    })
    saveToStorage()
}

