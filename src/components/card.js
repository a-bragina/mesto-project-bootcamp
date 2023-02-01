import { openPopup, closePopup } from "./utils.js";
import { popupPhotoAdd } from "./modal.js";

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const photoTemplate = document.querySelector("#photo-grid").content;
const elements = document.querySelector(".elements");
const popupBig = document.querySelector(".popup_big-view");
const illustrationBig = document.querySelector(
  ".element__illustration_big-view"
);
const textBig = document.querySelector(".element__text_big-view");

function createCard(item) {
  const photoElement = photoTemplate.querySelector(".element").cloneNode(true);
  const cardPhoto = photoElement.querySelector(".element__illustration");
  const cardText = photoElement.querySelector(".element__text");
  const photoNameInput = document.querySelector(
    ".popup__input_type_place-name"
  );
  const photoUrlInput = document.querySelector(".popup__input_type_photo-url");
  if (!item) {
    cardPhoto.src = photoUrlInput.value;
  } else {
    cardPhoto.src = item.link;
  }
  cardPhoto.alt = "иллюстрация";

  if (!item) {
    cardText.textContent = photoNameInput.value;
  } else {
    cardText.textContent = item.name;
  }

  photoElement.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("button_type_like")) {
      evt.target.classList.toggle("button_type_like-active");
    } else if (evt.target.classList.contains("element__trash")) {
      evt.target.closest(".element").remove();
    } else if (evt.target.classList.contains("element__illustration")) {
      illustrationBig.src = cardPhoto.src;
      textBig.textContent = cardText.textContent;
      openPopup(popupBig);
    }
  });
  return photoElement;
}

const uploadCards = initialCards.forEach(function (item) {
  const newPhotoElement = createCard(item);
  elements.append(newPhotoElement);
});

/* создание карточки с фото через попап */

const photoProfileForm = document.querySelector(".photo-form");

function handlePhotoFormSubmit(evt) {
  evt.preventDefault();
  const photoProfileElement = createCard();

  elements.prepend(photoProfileElement);

  evt.target.reset();

  closePopup(popupPhotoAdd);
}

photoProfileForm.addEventListener("submit", handlePhotoFormSubmit);

export { uploadCards };
