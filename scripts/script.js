const buttonEdit = document.querySelector(".button_type_edit");
const popupInfoEdit = document.querySelector(".popup_type_profile");
const closeButtons = document.querySelectorAll(".button_type_close");
const buttonAdd = document.querySelector(".button_type_add");
const popupPhotoAdd = document.querySelector(".popup_type_photo");

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

buttonEdit.addEventListener("click", function () {
  openPopup(popupInfoEdit);
});

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
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
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

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
      console.log(evt.target.classList);
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

initialCards.forEach(function (item) {
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
