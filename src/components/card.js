import {
  openPopup,
  closePopup,
  photoTemplate,
  elements,
  popupBig,
  illustrationBig,
  textBig,
} from "./utils.js";
import { popupPhotoAdd, renderLoading } from "./modal.js";
import { userId } from "./index.js";
import { avatarUrlInput } from "./modal.js";
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
  if (ownerId !== userId) {
    trash.style.display = "none";
  }
  cardPhoto.src = link;
  likesAmount.textContent = likesNumber;
  cardPhoto.alt = name;

  cardText.textContent = name;

  const isLikedByUser = likesArr.find((like) => {
    return like._id === userId;
  });
  if (isLikedByUser) {
    like.classList.add("button_type_like-active");
  }

  like.addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("button_type_like") &&
      !evt.target.classList.contains("button_type_like-active")
    ) {
      putLike(cardId)
        .then((data) => (likesAmount.textContent = data.likes.length))
        .then(() => evt.target.classList.add("button_type_like-active"))
        .catch((err) => {
          console.log(err);
        });
    } else if (
      evt.target.classList.contains("button_type_like") &&
      evt.target.classList.contains("button_type_like-active")
    ) {
      deleteLike(cardId)
        .then((data) => (likesAmount.textContent = data.likes.length))
        .then(() => evt.target.classList.remove("button_type_like-active"))
        .catch((err) => {
          console.log(err);
        });
    }
  });
  trash.addEventListener("click", (evt) => {
    deleteCard(cardId)
      .then(() => evt.target.closest(".element").remove())
      .catch((err) => {
        console.log(err);
      });
  });
  cardPhoto.addEventListener("click", (evt) => {
    illustrationBig.src = cardPhoto.src;
    illustrationBig.alt = cardText.textContent;

    textBig.textContent = cardText.textContent;
    openPopup(popupBig);
  });

  return photoElement;
}

/* создание карточки с фото через попап */

const photoProfileForm = document.querySelector(".form_type_photo");

function handlePhotoFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, evt.target["submit-card-add"]);
  createNewCard(photoNameInput.value, photoUrlInput.value)
    .then((data) => {
      const newElement = createCard(
        data.name,
        data.link,
        data.likes.length,
        data.likes,
        data.owner._id,
        data._id
      );
      elements.prepend(newElement);
    })
    .then(() => {
      closePopup(popupPhotoAdd);
      evt.target.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(false, evt.target["submit-card-add"]));
}

photoProfileForm.addEventListener("submit", handlePhotoFormSubmit);
