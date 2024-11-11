import { countItems } from "./components/updateCartAmount.js";
import { API_key } from "./constants.js";
import { API_secret } from "./constants.js";

const title = document.querySelector("title");
const queryString = document.location.search;
const errorCont = document.querySelector(".error_cont");
const container = document.querySelector(".gameinfo");
const loader = document.querySelector(".loader");
const params = new URLSearchParams(queryString);
const API_URL = "https://evrlong.one/wp-json/wc/v3/products";
const id = params.get("id");
console.log("id1", id);
const url = `${API_URL}/${id}?consumer_key=${API_key}&consumer_secret=${API_secret}`;
let cart = JSON.parse(localStorage.getItem("itemsInCart")) || [];
console.log("url", url);
console.log("id", id);

countItems(cart);

async function fetchGame() {
  try {
    const response = await fetch(url);
    const game = await response.json();
    loader.classList.remove("loader");
    createHtml(game);
  } catch (error) {
    const errorMsg = errorMessage("red", error);
    container.classList.add("error_msg");
    container.innerHTML = errorMsg;
  }
}

fetchGame();

function createHtml(game) {
  console.log(game);
  title.innerHTML = game.name;
  console.log(game.name);
  console.log("img", game.images.src);
  const gameInfo = document.createElement("div");
  gameInfo.classList.add("gameinfo__container");
  gameInfo.innerHTML = `
    <div class="gameinfo_img">
        <img src="${game.images[0]?.src || "default-image-url.jpg"}" alt="${
    game.name
  }" title="${game.name}">
    </div>
    <div class="gameinfo_reverse">
      <section class="gameinfo_section">
        <h2>${game.name}</h2>
        <p>${game.description}</p>
      </section>

      <div class="gameinfo_cartsection">
      <div class="gameinfo_price">
          ${
            game.sale_price === game.regular_price
              ? `<h2 class="new_price">$${game.price}</h2>`
              : `<h2 class="old_price">$${game.price}</h2>
                 <h2 class="new_price">$${game.sale_price}</h2>`
          }
        <button id="setLocal" class="button_cart">Add to cart</button>
      </div>
    </div>`;

  container.appendChild(gameInfo);

  document.getElementById("setLocal").addEventListener("click", function () {
    const gameData = game;
    console.log(cart);
    if (cart.some((item) => item.id === gameData.id)) {
      console.log(gameData.numberOfUnits);
      alert("Already added");
    } else {
      cart.push({ ...gameData, numberOfUnits: 1 });

      let cartString = JSON.stringify(cart);
      localStorage.setItem("itemsInCart", cartString);
      countItems(cart);
    }
  });
}
