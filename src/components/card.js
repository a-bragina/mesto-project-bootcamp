import {
  openPopup,
  closePopup,
  photoTemplate,
  elements,
  popupBig,
  illustrationBig,
  textBig,
} from "./utils.js";
import { popupPhotoAdd } from "./modal.js";

import { createNewCard, deleteCard, putLike, deleteLike } from "./api.js";

export const photoNameInput = document.querySelector(
  ".form__input_type_place-name"
);
export const photoUrlInput = document.querySelector(
  ".form__input_type_photo-url"
);

export function createCard(name, link, likesNumber, likesArr, ownerId, cardId) {
  const photoElement = photoTemplate.querySelector(".element").cloneNode(true);
  const cardPhoto = photoElement.querySelector(".element__illustration");
  const cardText = photoElement.querySelector(".element__text");
  const likesAmount = photoElement.querySelector(".likes-amount");
  const trash = photoElement.querySelector(".element__trash");
  const like = photoElement.querySelector(".button_type_like");
  if (ownerId !== "ec533366206c7cdb342d7b32") {
    trash.style.display = "none";
  }

  cardPhoto.src = link;
  likesAmount.textContent = likesNumber;
  cardPhoto.alt = "иллюстрация";

  cardText.textContent = name;

  const isLikedByUser = likesArr.find((like) => {
    return like._id === "ec533366206c7cdb342d7b32";
  });
  if (isLikedByUser) {
    like.classList.add("button_type_like-active");
  }

  photoElement.addEventListener("click", function (evt) {
    if (
      evt.target.classList.contains("button_type_like") &&
      !evt.target.classList.contains("button_type_like-active")
    ) {
      putLike(cardId).then(
        (data) => (likesAmount.textContent = data.likes.length)
      );

      evt.target.classList.add("button_type_like-active");
    } else if (
      evt.target.classList.contains("button_type_like") &&
      evt.target.classList.contains("button_type_like-active")
    ) {
      deleteLike(cardId).then(
        (data) => (likesAmount.textContent = data.likes.length)
      );
      evt.target.classList.remove("button_type_like-active");
    } else if (evt.target.classList.contains("element__trash")) {
      deleteCard(cardId);
      evt.target.closest(".element").remove();
    } else if (evt.target.classList.contains("element__illustration")) {
      illustrationBig.src = cardPhoto.src;
      illustrationBig.alt = "иллюстрация";

      textBig.textContent = cardText.textContent;
      openPopup(popupBig);
    }
  });
  return photoElement;
}

/* создание карточки с фото через попап */

const photoProfileForm = document.querySelector(".form_type_photo");

function handlePhotoFormSubmit(evt) {
  evt.preventDefault();
  createNewCard();

  closePopup(popupPhotoAdd);

  evt.target.reset();
}

photoProfileForm.addEventListener("submit", handlePhotoFormSubmit);
