export function hoverReset() {
  console.log("reset complete");
  document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".addCartBtn");

    buttons.forEach((button) => {
      button.addEventListener("touchstart", function () {
        button.classList.add("hover");
      });

      button.addEventListener("touchend", function () {
        button.classList.remove("hover");
      });
    });
  });
}
