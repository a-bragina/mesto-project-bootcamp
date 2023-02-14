import { enableValidation } from "./validate.js";
import { setUserInfo, uploadCardsFromServer } from "./api.js";
import { userName, userJob, userAvatar } from "./utils.js";
import { createCard } from "./card.js";
import { elements } from "./utils.js";
import "./../styles/index.css";

export let userId;

Promise.all([setUserInfo(), uploadCardsFromServer()])
  .then(([userData, cards]) => {
    userName.textContent = userData.name;
    userJob.textContent = userData.about;
    userAvatar.src = userData.avatar;
    userId = userData._id;

    return cards.map((card) =>
      createCard(
        card.name,
        card.link,
        card.likes.length,
        card.likes,
        card.owner._id,
        card._id
      )
    );
  })
  .then((cards) => {
    cards.forEach((card) => {
      elements.append(card);
    });
  })
  .catch((err) => {
    console.log(err);
  });
