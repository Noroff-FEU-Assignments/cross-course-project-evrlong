export function hoverReset() {
  console.log("reset loaded");
  const buttons = document.querySelectorAll(".addCartBtn");

  buttons.forEach((button) => {
    button.addEventListener("touchstart", function () {
      button.classList.add("hover");
      console.log("touchStart");
    });

    button.addEventListener("touchend", function () {
      button.classList.remove("hover");
      console.log("touchendt");
    });
  });
}
