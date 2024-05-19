import { countItems } from "./components/updateCartAmount.js";
let cart = JSON.parse(localStorage.getItem("itemsInCart")) || [];

countItems(cart);
