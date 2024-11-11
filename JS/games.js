import { BASE_API_URL } from "./constants.js";
import { countItems } from "./components/updateCartAmount.js";
import { countItemsMob } from "./components/updateCartAmount.js";
import { addToCart } from "./components/addToCart.js";

const url = BASE_API_URL;
const contCard = document.querySelector(".container__card");
const loader = document.querySelector(".loader");
const errorCont = document.querySelector(".error_cont");
let cart = JSON.parse(localStorage.getItem("itemsInCart")) || [];
let games = []; //store fetched games

document.addEventListener("DOMContentLoaded", () => {
  fetchUrl();
  countItems(cart);
  countItemsMob(cart);
  // Add event listener to the filter button
  const categoryDropdown = document.getElementById("categoryFilter");
  categoryDropdown.addEventListener("change", filterGamesByCategory);
  // add listener for sort by price
  document.getElementById("sortByPrice").addEventListener("click", () => {
    sortByPrice();
  });
});

async function fetchUrl() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    games = data;
    displayedGames = [...games]; // added to make default filtering possible. Empty if not
    loader.style.display = "none";
    displayGames(games); // Display all games (if not filtered)
  } catch (error) {
    const errorMsg = errorMessage("red", error);
    errorCont.innerHTML = errorMsg;
    loader.style.display = "none";
  }
}
function displayGames(gamesToDisplay) {
  contCard.innerHTML = ""; // clear content before display
  gamesToDisplay.forEach((game) => createGameCard(game));
}

let displayedGames = [];

function filterGamesByCategory() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  if (selectedCategory === "all") {
    displayedGames = [...games]; // Reset to all games
  } else {
    displayedGames = games.filter(
      (game) =>
        game.categories[0]?.name.toLowerCase() ===
        selectedCategory.toLowerCase()
    );
  }

  displayGames(displayedGames); // Display the filtered games
}

function sortByPrice() {
  displayedGames.sort((a, b) => a.price - b.price); // Sort the currently displayed games by price

  displayGames(displayedGames); // Update display with sorted games
}

function createGameCard(game) {
  try {
    const gameCardElement = document.createElement("div");
    gameCardElement.classList.add("game_card");
    gameCardElement.innerHTML = `
      <a href="details.html?id=${game.id}">
        <img src="${game.images[0]?.src || "default-image-url.jpg"}" alt="${
      game.name
    }" title="${game.name}"></img>
        <h3>${game.name}</h3>
        ${
          !game.sale_price
            ? `<div class="discountCont"><h2 class="new_price price_gameCard">$${game.price}</h2></div>`
            : `<div class="discountCont"><h2 class="old_price">$${game.regular_price}</h2>
               <h2 class="new_price">$${game.sale_price}</h2></div>`
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
  }
}

function errorMessage(color, error) {
  const message = error.message || "An unknown error occurred";
  return `<div style="color:${color}">${message}</div>`;
}
