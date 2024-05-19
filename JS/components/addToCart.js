import { countItems } from "./updateCartAmount.js";

let cart = JSON.parse(localStorage.getItem("itemsInCart")) || [];

export function addToCart(game) {
  if (cart.some((item) => item.id === game.id)) {
    alert("Already added");
  } else {
    cart.push({ ...game, numberOfUnits: 1 });
    countItems(cart);
    let cartString = JSON.stringify(cart);
    localStorage.setItem("itemsInCart", cartString);

    console.log(cart);
  }
}
