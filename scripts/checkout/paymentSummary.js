import { cart, calculateCartQuantity } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js"

export function renderPaymentSummary(){
    let productPriceCents=0;
    let shippingPriceCents=0;

    cart.forEach((cartItem) => {
        let matchingProduct = getProduct(cartItem.productId);
        productPriceCents += cartItem.quantity * matchingProduct.priceCents;

        let matchingDeliveryOption = getDeliveryOption(cartItem.deliveryOptionid);
        shippingPriceCents += matchingDeliveryOption.priceCents;
    })

    // console.log(productPriceCents,shippingPriceCents)
    const totalBeforeTaxPriceCents = productPriceCents+shippingPriceCents;
    const taxPriceCents = totalBeforeTaxPriceCents * 0.1;
    const totalPriceCents = totalBeforeTaxPriceCents+taxPriceCents;
    
    const cartQuantity = calculateCartQuantity();

    const paymentSummaryHTML = `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxPriceCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalPriceCents)}</div>
        </div>

        <button class="place-order-button button-primary">
            Place your order
        </button>
    `;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

}