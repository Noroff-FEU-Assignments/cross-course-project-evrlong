import { countItems } from "./updateCartAmount.js";

let cart = JSON.parse(localStorage.getItem("itemsInCart")) || [];

export function addToCart(game) {
  const itemExist = cart.find((item) => item.id === game.id);

  if (itemExist) {
    itemExist.numberOfUnits += 1;
  } else {
    cart.push({ ...game, numberOfUnits: 1 });
  }

  function showPopup() {
    const popAdded = document.querySelector(".popAdded");
    popAdded.style.display = "block";

    setTimeout(() => {
      popAdded.style.display = "none";
    }, 1500);
  }

  showPopup();

  let cartString = JSON.stringify(cart);
  localStorage.setItem("itemsInCart", cartString);

  countItems(cart);

  console.log(cart);
}
