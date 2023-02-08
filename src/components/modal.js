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
} from "./utils.js";

import { editProfileInfo, changeAvatar } from "./api.js";

popupList.forEach(function (popup) {
  popup.addEventListener("click", function (evt) {
    if (evt.target === popup) {
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
avatarBox.addEventListener("click", function () {
  openPopup(changeAvatarPopup);
});
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  editProfileInfo();

  closePopup(popupInfoEdit);

  evt.target.reset();
}
export const avatarUrlInput = document.querySelector(
  ".form__input_type_avatar"
);
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  changeAvatar();

  closePopup(changeAvatarPopup);

  evt.target.reset();
}
avatarForm.addEventListener("submit", handleAvatarFormSubmit);
profileForm.addEventListener("submit", handleProfileFormSubmit);

export { popupPhotoAdd };
