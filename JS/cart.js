const table = document.querySelector(".cart_table");
let cartString = localStorage.getItem("itemsInCart");
//declare cart variable and check if empty or not
let cart = cartString ? JSON.parse(cartString) : [];

console.log(cart);

function updateCart() {
  renderCartItems();
  localStorage.setItem("itemsInCart", JSON.stringify(cart));
  const emptyCart = document.querySelector(".emptyCart");

  const itemEqZero = cart.find((item) => item.numberOfUnits === 0);
  if (itemEqZero) {
    showPopup(itemEqZero.id);
  }

  if (cart.length === 0) {
    emptyCart.style.display = "block";
  }
}

updateCart();
//add new rows in cart
function renderCartItems() {
  table.innerHTML = "";
  cart.forEach((item) => {
    let newRow = document.createElement("div");
    newRow.classList.add("rowCart");
    newRow.innerHTML = `
    <div class="cartItemFirst">
    <img class="imgCart" src="${item.image.url}" alt="${item.title}">
    <p>${item.title}</p>
</div>

      <div class="cartItemSecond">
      <div class="subtotalCart"><p class="cart_price">$${item.price}</p></div>
      <div class="plusTotMinus">

<div class="unitBtn minus" onclick="changenumberOfUnits('minus', '${item.id}')">-</div>
        <div class="unitNumber">${item.numberOfUnits}</div>
        <div class="unitBtn plus" onclick="changenumberOfUnits('plus', '${item.id}')">+</div>
        </div>

      <div class="removeItemCart" onclick="removeItemCart('${item.id}')"><i class="fa fa-times-circle" aria-hidden="true"></i></div>
  
        </div>
   
  `;
    table.appendChild(newRow);
  });
}

// change number of units
function changenumberOfUnits(action, id) {
  cart = cart.map((item) => {
    if (item.id === id) {
      let numberOfUnits = item.numberOfUnits;
      if (action === "minus" && item.numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus") {
        numberOfUnits++;
      }
      return {
        ...item,
        numberOfUnits,
      };
    }
    return item;
  });

  calcTotSum();

  function updateCart() {
    renderCartItems();
    localStorage.setItem("itemsInCart", JSON.stringify(cart));

    const itemEqZero = cart.find((item) => item.numberOfUnits === 0);
    if (itemEqZero) {
      showPopup(itemEqZero.id);
    }
  }

  // const itemZero = cart = cart.filter((item) => item.numberOfUnits > 0);

  {
    updateCart();
  }
}
// calc total price and items
function calcTotSum() {
  let totalPrice = 0;
  const eachSum = [];
  const renderTotal = document.querySelector(".totSum");
  cart.forEach((item) => {
    const calcedItem = item.price * item.numberOfUnits;
    eachSum.push(calcedItem);
    totalPrice += calcedItem;
    formattedPrice = totalPrice.toFixed(2);
  });

  console.log("Total Price:", totalPrice);
  renderTotal.innerHTML = `${formattedPrice}`;
}

calcTotSum();

// removes items when click remove
function removeItemCart(id) {
  const popupCart = document.getElementById("popupCart");
  popupCart.style.display = "block";
  const yesBtn = popupCart.querySelector(".btnCartYes");
  const noBtn = popupCart.querySelector(".btnCartNo");

  yesBtn.addEventListener("click", function () {
    cart = cart.filter((item) => item.id !== id);
    popupCart.style.display = "none";
    updateCart();
    calcTotSum();
  });

  noBtn.addEventListener("click", function () {
    popupCart.style.display = "none";
  });
}
