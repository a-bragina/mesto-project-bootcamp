import {
  openPopup,
  closePopup,
  buttonEdit,
  popupInfoEdit,
  buttonAdd,
  popupPhotoAdd,
  popupList,
  profileForm,
  changeAvatarPopup,
  avatarBox,
  avatarForm,
  avatar,
  nameInput,
  jobInput,
} from "./utils.js";

import { editProfileInfo, changeAvatar } from "./api.js";
import { userName, userJob, userAvatar } from "./utils.js";

popupList.forEach(function (popup) {
  popup.addEventListener("click", function (evt) {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
});

buttonEdit.addEventListener("click", function () {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  openPopup(popupInfoEdit);
});

buttonAdd.addEventListener("click", function () {
  openPopup(popupPhotoAdd);
});
avatarBox.addEventListener("click", function () {
  openPopup(changeAvatarPopup);
});
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  renderLoading(true, evt.target["submit-profile-edit"]);

  editProfileInfo(nameInput.value, jobInput.value)
    .then((data) => {
      userName.textContent = data.name;
      userJob.textContent = data.about;
    })
    .then(() => {
      closePopup(popupInfoEdit);
      evt.target.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(false, evt.target["submit-profile-edit"]));
}
export const avatarUrlInput = document.querySelector(
  ".form__input_type_avatar"
);
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, evt.target["submit-avatar-edit"]);
  changeAvatar(avatarUrlInput.value)
    .then((data) => (avatar.src = data.avatar))
    .then(() => {
      closePopup(changeAvatarPopup);
      evt.target.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(false, evt.target["submit-avatar-edit"]));
}
avatarForm.addEventListener("submit", handleAvatarFormSubmit);
profileForm.addEventListener("submit", handleProfileFormSubmit);

export function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}

export { popupPhotoAdd };
