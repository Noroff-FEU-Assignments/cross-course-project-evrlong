export function checkTrash(cart) {
  const trashCan = document.querySelector(".emptyCartItems");

  if (!trashCan) {
    return;
  }

  if (
    !trashCan.classList.contains("emptyCartItemsDisable") &&
    cart.length === 0
  ) {
    trashCan.classList.remove("emptyCartItems");
    trashCan.classList.add("emptyCartItemsDisable");
  }
}
