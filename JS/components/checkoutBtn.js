let cart = JSON.parse(localStorage.getItem("itemsInCart")) || [];

export function checkOut(cart) {
  const checkOutBtn = document.querySelector(".button_complete");

  checkOutBtn.addEventListener("click", function () {
    if (cart.length === 0) {
      return;
    } else {
      cart = [];
      localStorage.setItem("itemsInCart", JSON.stringify(cart));
      window.location.href = "success.html";
    }
  });
}
