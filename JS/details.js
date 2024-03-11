const gameInfo = document.querySelector(".gameinfo__container")
const title = document.querySelector("title")
const queryString = document.location.search;

console.log ("query", queryString)


const paramas = new URLSearchParams(queryString);

const id = paramas.get("id")

console.log(id)
const url = "https://v2.api.noroff.dev/gamehub/" + id

console.log(url)

async function fetchGame() {
    try {
        const response = await fetch(url);
        const game = await response.json();
      

        console.log("test", game);

        createHtml(game);
    }
    catch(error) {
        console.log(error)
        gameInfo.innerHTML = message("error", error)
    }

}





fetchGame();

function createHtml(game) {
    title.innerHTML = game.data.title


    gameInfo.innerHTML = `
    <div class="gameinfo_img">
    <img src=${game.data.image.url} alt="${game.data.title}" title="${game.data.title}">
    </div>
    <div class="gameinfo_reverse">
      <section class="gameinfo_section">
      <h2>${game.data.title}</h2>
      <p> ${game.data.description} </p>

      </section>

      <div class="gameinfo_cartsection">

        <div class="gameinfo_price">

        ${game.data.discountedPrice === game.data.price ? `<h2 class="new_price"> $${game.data.price}</h2>` : `
        <h2 class="old_price"> $${game.data.price}</h2>
       <h2 class="new_price"> $${game.data.discountedPrice}</h2>
      `
       }

        </div>
        <button class="button_cart">Add to cart <i class="fa fa-plus-circle fa-1x" aria-hidden="true"></i></button>
      </div>
`
}



