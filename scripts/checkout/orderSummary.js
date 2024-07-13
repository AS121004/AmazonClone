import { cart, removeFromCart, calculateCartQuantity, updateCartItemQuantityIncheckout, updateDeliveryOption } from "../../data/cart.js";
import { getProduct, products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { updateHeaderCartQuantity } from "./checkoutHeader.js";


export function renderOrderSummary(){
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct=getProduct(productId);

    const deliveryOptionid = cartItem.deliveryOptionid;
    let matchingDeliveryOption=getDeliveryOption(deliveryOptionid);

    let deliveryDays=matchingDeliveryOption.deliveryDays;

    const today=dayjs();
    const deliveryDate = today.add(deliveryDays,'days');
    const deliveryDateString = deliveryDate.format('dddd, MMMM D');


    cartSummaryHTML += `
          <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
              <div class="delivery-date">
                Delivery date: ${deliveryDateString}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingProduct.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                    ${formatCurrency(matchingProduct.priceCents)}
                  </div>
                  <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                    <span>
                      Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                    </span>
                    <span data-product-id=${matchingProduct.id} class="update-quantity-link link-primary js-update-quantity-link">
                      Update
                    </span>
                    <input class='quantity-input js-quantity-input-${matchingProduct.id}'>
                    <span data-product-id=${matchingProduct.id} class='save-quantity-link js-save-quantity-link link-primary'>Save</span>
                    <span data-product-id=${matchingProduct.id} class="delete-quantity-link link-primary js-delete-quantity-link">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionsHTML(matchingProduct,cartItem)}
                </div>
              </div>
            </div>
      `;
  })
  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;


  function deliveryOptionsHTML(matchingProduct,cartItem){
    let html='';

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
      const dateString = deliveryDate.format('dddd, MMMM D');

      const price = formatCurrency(deliveryOption.priceCents);
      const priceString = ((deliveryOption.priceCents === 0) ? 'FREE Shipping' : `$${price} -Shipping`);

      const isChecked = ((deliveryOption.id === cartItem.deliveryOptionid) ? 'checked' : '');

      html+=`
        <div data-matching-product-id=${matchingProduct.id} data-delivery-optionid=${deliveryOption.id} class="delivery-option js-delivery-option">
          <input type="radio"
            ${isChecked}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString}
            </div>
          </div>
        </div>

      `;
    })
    return html 
  }




  document.querySelectorAll('.js-delete-quantity-link').forEach((link) => {
    link.addEventListener(('click'), () => {
      const { productId } = link.dataset;

      removeFromCart(productId);
      // updateHeaderCartQuantity()
      // console.log(cart);

      updateHeaderCartQuantity(calculateCartQuantity());
      renderOrderSummary();
      renderPaymentSummary();
      
    })
  })


  document.querySelectorAll('.js-update-quantity-link').forEach((link) => {
    link.addEventListener(('click'), () => {
      const { productId } = link.dataset;
      document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing-quantity');
    })
  })


  document.querySelectorAll('.js-save-quantity-link').forEach((link) => {
    link.addEventListener(('click'), () => {
      const { productId } = link.dataset;

      const cartItemNewQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);

      if (cartItemNewQuantity > 0) {
        updateCartItemQuantityIncheckout(cartItemNewQuantity, productId);

        updateHeaderCartQuantity();

        document.querySelector(`.js-quantity-label-${productId}`).innerHTML = cartItemNewQuantity;
      }
      // document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');
      
      renderOrderSummary();
      renderPaymentSummary();
      
    })
  })


  
  updateHeaderCartQuantity(calculateCartQuantity());


  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener(('click'), () => {
      const {matchingProductId, deliveryOptionid} = element.dataset;
      // console.log(matchingProductId, deliveryOptionid)

      updateDeliveryOption(matchingProductId,deliveryOptionid);
      renderOrderSummary();
      renderPaymentSummary();
    })
  })


  console.log(cart)
}
