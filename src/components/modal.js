import { openPopup, closePopup } from "./utils.js";

const buttonEdit = document.querySelector(".button_type_edit");
const popupInfoEdit = document.querySelector(".popup_type_profile");

const buttonAdd = document.querySelector(".button_type_add");
const popupPhotoAdd = document.querySelector(".popup_type_photo");

const popupList = Array.from(document.querySelectorAll(".popup"));

popupList.forEach(function (popup) {
  popup.addEventListener("click", function (evt) {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      closePopup(popup);
    }
  });
});

buttonEdit.addEventListener("click", function () {
  openPopup(popupInfoEdit);
});

buttonAdd.addEventListener("click", function () {
  openPopup(popupPhotoAdd);
});

const profileForm = document.querySelector(".profile-form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const profileName = document.querySelector(".profile__user-name");
const profileJob = document.querySelector(".profile__user-info");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(popupInfoEdit);

  evt.target.reset();
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

export { popupPhotoAdd };
