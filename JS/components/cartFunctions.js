export function countItems(cart) {
  const itemCounter = document.querySelector(".countIcon");
  let cartQuantity = cart.length;

  if (cartQuantity === 0) {
    itemCounter.style.display = "none";
  } else {
    itemCounter.style.display = "block";
    itemCounter.innerHTML = `${cartQuantity}`;
  }
}
