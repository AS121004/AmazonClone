class Cart {

    cartItems;
    localStorageNameKey;

    constructor(localStorageNameKey){
        this.localStorageNameKey=localStorageNameKey;
        this.loadFromStorage()
    }


    loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.localStorageNameKey));

        if (!this.carItems) {
            this.carItems = [
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


    saveToStorage() {
        localStorage.setItem(this.localStorageNameKey, JSON.stringify(this.carItems));
    }


    addToCart(productId) {
        const newQuantityToBeAdded = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

        // Only For Tests
        // const newQuantityToBeAdded =1;


        let matchingItem;

        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem
            }
        })

        if (matchingItem) {
            matchingItem.quantity += newQuantityToBeAdded;
        }
        else {
            this.cartItems.push({
                productId: productId,
                quantity: newQuantityToBeAdded,
                deliveryOptionid: '1'
            });
        }

        this.saveToStorage();
    }


    calculateCartQuantity() {
        let cartQuantity = 0;

        this.cartItems.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        });
        return cartQuantity;
    }

    updateCartQuantity(productId) {
        let cartQuantity = this.calculateCartQuantity();

        console.log(this.cartItems)

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
        this.saveToStorage()
    }


    removeFromCart(productId) {
        let newcart = [];

        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
                newcart.push(cartItem)
            }
        })

        this.cartItems = newcart;
        this.saveToStorage()
    }


    updateCartItemQuantityIncheckout(cartItemNewQuantity, productId) {
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId === productId) {
                cartItem.quantity = cartItemNewQuantity;
            }
        })
        this.saveToStorage()
    }


    updateDeliveryOption(matchingProductId, deliveryOptionid) {

        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId === matchingProductId) {
                cartItem.deliveryOptionid = deliveryOptionid;
            }
        })
        this.saveToStorage()
    }

};


const newcart = new Cart('cart-oops')

newcart.loadFromStorage()
console.log(newcart)




