const loader = document.querySelector(".loader");
const cart_info = document.querySelector(".cart_info");
const table = document.querySelector(".cart_table");
const cartPrice = document.querySelector(".cart_price");

var inputNumberValue;
var addedGames = [];

for (var key in localStorage) {
  if (key.startsWith("cartItem")) {
    var gameDetails = JSON.parse(localStorage[key]);
    if (
      gameDetails &&
      gameDetails.title &&
      !addedGames.includes(gameDetails.title)
    ) {
      addedGames.push(gameDetails.title);

      var newRow = document.createElement("tr");

      newRow.innerHTML = `
                        <img src="${gameDetails.img}">
                         <p>${gameDetails.title}</p>
                         <td> <input type="number" value="1" class="input_num"></td>
                <td class="subtotal_cart">
                   <p class="cart_price">${gameDetails.price}</p>
                </td>   
                <td class="remove_item"> x
                </td> 
            `;
      table.appendChild(newRow);
    }
  }
}
