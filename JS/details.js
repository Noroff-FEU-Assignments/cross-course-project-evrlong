import { countItems } from "./components/updateCartAmount.js";

const title = document.querySelector("title");
const queryString = document.location.search;
const errorCont = document.querySelector(".error_cont");
const container = document.querySelector(".gameinfo");
const loader = document.querySelector(".loader");
const params = new URLSearchParams(queryString);
const id = params.get("id");
const url = "https://v2.api.noroff.dev/gamehub/" + id;
let cart = JSON.parse(localStorage.getItem("itemsInCart")) || [];

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
  title.innerHTML = game.data.title;

  const gameInfo = document.createElement("div");
  gameInfo.classList.add("gameinfo__container");
  gameInfo.innerHTML = `
    <div class="gameinfo_img">
      <img src="${game.data.image.url}" alt="${game.data.title}" title="${
    game.data.title
  }">
    </div>
    <div class="gameinfo_reverse">
      <section class="gameinfo_section">
        <h2>${game.data.title}</h2>
        <p>${game.data.description}</p>
      </section>

      <div class="gameinfo_cartsection">
        <div class="gameinfo_price">
          ${
            game.data.discountedPrice === game.data.price
              ? `<h2 class="new_price">$${game.data.price}</h2>`
              : `<h2 class="old_price">$${game.data.price}</h2>
                 <h2 class="new_price">$${game.data.discountedPrice}</h2>`
          }
        </div>
        <button id="setLocal" class="button_cart">Add to cart</button>
      </div>
    </div>`;

  container.appendChild(gameInfo);

  document.getElementById("setLocal").addEventListener("click", function () {
    const gameData = game.data;
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
