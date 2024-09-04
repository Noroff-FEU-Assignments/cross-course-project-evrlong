import { countItems } from "./components/updateCartAmount.js";
import { countItemsMob } from "./components/updateCartAmount.js";
let cart = JSON.parse(localStorage.getItem("itemsInCart")) || [];

countItems(cart);
countItemsMob(cart);
