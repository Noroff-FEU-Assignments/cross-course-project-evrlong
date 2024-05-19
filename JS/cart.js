import { countItems } from "./components/updateCartAmount.js";
import { checkTrash } from "./components/checkTrash.js";
import { countItemsMob } from "./components/updateCartAmount.js";

const table = document.querySelector(".cart_table");
let cartString = localStorage.getItem("itemsInCart");

// Declare cart variable and check if empty or not
let cart = cartString ? JSON.parse(cartString) : [];

countItems(cart);

function updateCart() {
  renderCartItems();
  localStorage.setItem("itemsInCart", JSON.stringify(cart));
  const emptyCart = document.querySelector(".emptyCart");
  const renderTotal = document.querySelector(".totSum");
  const itemEqZero = cart.find((item) => item.numberOfUnits === 0);
  if (itemEqZero) {
    showPopup(itemEqZero.id);
  }
  if (cart.length === 0) {
    renderTotal.innerHTML = `0`;
    emptyCart.style.display = "block";
  } else {
    emptyCart.style.display = "none";
  }
  countItems(cart);
  checkTrash(cart);
  countItemsMob(cart);
}

const menuCart = document.querySelector(".emptyCartItems");
menuCart.addEventListener("click", function () {
  console.log("clicked");
  if (cart.length === 0) {
    return;
  } else {
    popupCart.style.display = "block";
    const yesBtn = popupCart.querySelector(".btnCartYes");
    const noBtn = popupCart.querySelector(".btnCartNo");

    yesBtn.addEventListener("click", function () {
      cart = [];
      localStorage.setItem("itemsInCart", JSON.stringify(cart));
      popupCart.style.display = "none";
      updateCart();
      calcTotSum();
    });

    noBtn.addEventListener("click", function () {
      popupCart.style.display = "none";
    });
  }
});

updateCart();

// Add new rows in cart
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
          <div class="unitBtn minus" data-id="${item.id}" data-action="minus">-</div>
          <div class="unitNumber">${item.numberOfUnits}</div>
          <div class="unitBtn plus" data-id="${item.id}" data-action="plus">+</div>
        </div>
        <div class="removeItemCart" data-id="${item.id}"><i class="fa fa-times-circle" aria-hidden="true"></i></div>
      </div>
    `;
    table.appendChild(newRow);

    // Add event listener for remove item button
    const removeItemCart = newRow.querySelector(".removeItemCart");
    removeItemCart.addEventListener("click", function (event) {
      const id = item.id;
      cart = cart.filter((item) => item.id !== id);
      updateCart();
      calcTotSum();
      countItems(cart);
    });

    // Add event listeners for plus and minus buttons
    const plusButton = newRow.querySelector(".unitBtn.plus");
    const minusButton = newRow.querySelector(".unitBtn.minus");

    plusButton.addEventListener("click", function () {
      changenumberOfUnits("plus", item.id);
    });

    minusButton.addEventListener("click", function () {
      changenumberOfUnits("minus", item.id);
    });
  });
}

// Change number of units
function changenumberOfUnits(action, id) {
  cart = cart.map((item) => {
    if (item.id === id) {
      let numberOfUnits = item.numberOfUnits;
      if (action === "minus" && numberOfUnits > 1) {
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
  updateCart();
}

// Calculate total price and items
function calcTotSum() {
  const renderTotal = document.querySelector(".totSum");

  if (cart.length === 0) {
    renderTotal.innerHTML = "0";
    return;
  }

  let totalPrice = 0;
  cart.forEach((item) => {
    const calcedItem = item.price * item.numberOfUnits;
    totalPrice += calcedItem;
  });

  const formattedPrice = totalPrice.toFixed(2);
  renderTotal.innerHTML = `$${formattedPrice}`;
}

calcTotSum();
updateCart();
