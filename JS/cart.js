const table = document.querySelector(".cart_table");
let cartString = localStorage.getItem("itemsInCart");
//declare cart variable and check if empty or not
let cart = cartString ? JSON.parse(cartString) : [];

function updateCart() {
  renderCartItems();
  localStorage.setItem("itemsInCart", JSON.stringify(cart));

  const itemEqZero = cart.find((item) => item.numberOfUnits === 0);
  if (itemEqZero) {
    showPopup(itemEqZero.id);
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
    <div class="cartItemLeft">
    <img class="imgCart" src="${item.image.url}" alt="${item.title}">
      ${item.title}
</div>
      <div class="cartItemRight">
      <div class="unitBtn minus" onclick="changenumberOfUnits('minus', '${item.id}')">-</div>
        <div class="unitNumber">${item.numberOfUnits}</div>
        <div class="unitBtn plus" onclick="changenumberOfUnits('plus', '${item.id}')">+</div>
        <div class="subtotalCart"><p class="cart_price">$${item.price}</p></div>
        <div class="removeItemCart" onclick="removeItemCart('${item.id}')">X</div>
        </div>
    
        
      </div>
    </td>
   
  `;
    table.appendChild(newRow);
  });
}

// change number
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
  });

  noBtn.addEventListener("click", function () {
    popupCart.style.display = "none";
  });
}
