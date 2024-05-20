import { BASE_API_URL } from "./constants.js";
import { countItems } from "./components/updateCartAmount.js";
import { countItemsMob } from "./components/updateCartAmount.js";
import { addToCart } from "./components/addToCart.js";
import { hoverReset } from "./components/resetTouch.js";

const url = BASE_API_URL;
const contCard = document.querySelector(".container__card");
const loader = document.querySelector(".loader");
const errorCont = document.querySelector(".error_cont");
let cart = JSON.parse(localStorage.getItem("itemsInCart")) || [];

//must be added for countItemMob to update
document.addEventListener("DOMContentLoaded", () => {
  fetchUrl();
  countItems(cart);
  countItemsMob(cart);
  hoverReset();
});

async function fetchUrl() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const games = data.data;
    loader.classList.remove("loader");
    games.forEach((game) => createGameCard(game));
  } catch (error) {
    const errorMsg = errorMessage("red", error);
    errorCont.innerHTML = errorMsg;
    loader.classList.remove("loader");
  }
}

async function createGameCard(game) {
  try {
    const gameCardElement = document.createElement("div");
    gameCardElement.classList.add("game_card");
    gameCardElement.innerHTML = `
      <a href="details.html?id=${game.id}">
        <img src="${game.image.url}" alt="${game.title}" title="${
      game.title
    }"></img>
        <h3>${game.title}</h3>
        ${
          game.discountedPrice === game.price
            ? `<h2 class="org_price">$${game.price}</h2>`
            : `<h2 class="old_price">$${game.price}</h2>
               <h2 class="new_price">$${game.discountedPrice}</h2>`
        }
      </a>`;

    const gameCardBtn = document.createElement("div");
    gameCardBtn.classList.add("addCartBtn");
    gameCardBtn.innerHTML = `<div class="cartBtn">Add to cart</div>`;

    gameCardElement.appendChild(gameCardBtn);
    contCard.appendChild(gameCardElement);

    gameCardBtn.querySelector(".cartBtn").addEventListener("click", () => {
      addToCart(game);
      cart = JSON.parse(localStorage.getItem("itemsInCart")) || [];
      countItems(cart);
      countItemsMob(cart);
    });
  } catch (error) {
    const errorMsg = errorMessage("red", error);
    errorCont.innerHTML = errorMsg;
    loader.classList.remove("loader");
  }
}

function errorMessage(color, error) {
  return `<div style="color:${color}">${error.message}</div>`;
}
