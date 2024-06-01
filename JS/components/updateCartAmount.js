export function countItems(cart) {
  const itemCounter = document.querySelector(".countIcon");
  let cartQuantity = cart.reduce(
    (totalUnits, currentItem) => totalUnits + currentItem.numberOfUnits,
    0
  );

  if (cartQuantity === 0) {
    itemCounter.style.display = "none";
  } else {
    itemCounter.style.display = "block";
    itemCounter.innerHTML = `${cartQuantity}`;
  }
}

export function countItemsMob(cart) {
  const itemCounterMob = document.querySelector(".countIconMob");
  if (!itemCounterMob) {
    console.error("countIconMob element not found");
    return;
  }

  let cartQuantity = cart.length;
  console.log(`Quantity cart: ${cartQuantity}`);

  if (cartQuantity === 0) {
    itemCounterMob.style.display = "none";
  } else {
    itemCounterMob.style.display = "block";
    itemCounterMob.innerHTML = `${cartQuantity}`;
  }
}
