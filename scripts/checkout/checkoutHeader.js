export function updateHeaderCartQuantity(cartQuantity) {

    document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;
}