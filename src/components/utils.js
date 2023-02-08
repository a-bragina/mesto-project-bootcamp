const photoTemplate = document.querySelector("#photo-grid").content;
const elements = document.querySelector(".elements");
const popupBig = document.querySelector(".popup_big-view");
const illustrationBig = document.querySelector(
  ".element__illustration_big-view"
);
const textBig = document.querySelector(".element__text_big-view");

const buttonEdit = document.querySelector(".button_type_edit");
const popupInfoEdit = document.querySelector(".popup_type_profile");

const buttonAdd = document.querySelector(".button_type_add");
const popupPhotoAdd = document.querySelector(".popup_type_photo");

const popupList = Array.from(document.querySelectorAll(".popup"));

const profileForm = document.querySelector(".form_type_profile");
const nameInput = document.querySelector(".form__input_type_name");
const jobInput = document.querySelector(".form__input_type_job");
const profileName = document.querySelector(".profile__user-name");
const profileJob = document.querySelector(".profile__user-info");

const userName = document.querySelector(".profile__user-name");
const userJob = document.querySelector(".profile__user-info");
const userAvatar = document.querySelector(".avatar");
const changeAvatarPopup = document.querySelector(".popup_type_avatar");
const avatarBox = document.querySelector(".avatar-box");
const avatarForm = document.querySelector(".form_type_avatar");
const avatar = document.querySelector(".avatar");
const closeButtons = Array.from(
  document.querySelectorAll(".button_type_close")
);
const escClose = (evt) => {
  if (evt.key === "Escape") {
    closePopup(popup);
  }
};

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", escClose);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", escClose);
}
closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

const headerWrapper = document.querySelector(".wrapper__header");
function setHeaderWrapper() {
  headerWrapper.classList.add("wrapper");
}
function deleteHeaderWrapper() {
  headerWrapper.classList.remove("wrapper");
}

function manageHeaderWrapper() {
  if (window.innerWidth <= 320 && headerWrapper.classList.contains("wrapper")) {
    deleteHeaderWrapper();
  } else if (
    window.innerWidth > 320 &&
    !headerWrapper.classList.contains("wrapper")
  ) {
    setHeaderWrapper();
  }
}

window.addEventListener("resize", manageHeaderWrapper);

export {
  openPopup,
  closePopup,
  photoTemplate,
  elements,
  popupBig,
  illustrationBig,
  textBig,
  buttonEdit,
  popupInfoEdit,
  buttonAdd,
  popupPhotoAdd,
  popupList,
  profileForm,
  nameInput,
  jobInput,
  profileName,
  profileJob,
  userName,
  userJob,
  userAvatar,
  changeAvatarPopup,
  avatarBox,
  avatarForm,
  avatar,
};
