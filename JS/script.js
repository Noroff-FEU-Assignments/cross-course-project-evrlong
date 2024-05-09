const url = "https://v2.api.noroff.dev/gamehub/";
const contCard = document.querySelector(".container__card");
const gameCard = document.querySelector(".game_card");
const loader = document.querySelector(".loader");
const errorCont = document.querySelector(".error_cont");

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

fetchUrl();

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
    gameCardBtn.classList.add("addCartBtnCon");
    gameCardBtn.innerHTML = `<div><button>Add to cart</button>
    </div>`;
    gameCardElement.appendChild(gameCardBtn);

    contCard.appendChild(gameCardElement);
  } catch (error) {
    const errorMsg = errorMessage("red", error);
    errorCont.innerHTML = errorMsg;
    loader.classList.remove("loader");
  }
}
