const closeButtons = Array.from(
  document.querySelectorAll(".button_type_close")
);

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}
closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

const header = document.querySelector(".header");

export { openPopup, closePopup };
