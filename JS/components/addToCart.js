import { countItems } from "./cartFunctions.js";

let cart = JSON.parse(localStorage.getItem("itemsInCart")) || [];

export function addToCart(game) {
  if (cart.some((item) => item.id === game.id)) {
    alert("Already added");
  } else {
    cart.push({ ...game, numberOfUnits: 1 });
    countItems(cart);
    let cartString = JSON.stringify(cart);
    console.log("testcart", cartString);
    localStorage.setItem("itemsInCart", cartString);

    console.log(cart);
  }
}
