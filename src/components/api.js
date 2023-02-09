import { userName, userJob, userAvatar } from "./utils.js";
import { createCard, photoNameInput, photoUrlInput } from "./card.js";
import { elements, avatar } from "./utils.js";
import { nameInput, jobInput } from "./utils.js";
import { avatarUrlInput } from "./modal.js";

const config = {
  baseUrl: "https://nomoreparties.co/v1/wbf-cohort-5",
  headers: {
    authorization: "841c5014-6808-4c4d-aebc-fbc939821d00",
    "Content-Type": "application/json",
  },
};

export const setUserInfo = function () {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
      userName.textContent = data.name;
      userJob.textContent = data.about;
      userAvatar.src = data.avatar;
    })
    .catch((err) => {
      console.log(err);
    });
};
export let likedByUser;
export const uploadCardsFromServer = function () {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((datas) => {
      return datas.map((data) =>
        createCard(
          data.name,
          data.link,
          data.likes.length,
          data.likes,
          data.owner._id,
          data._id
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
};

export const editProfileInfo = function () {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: `${nameInput.value}`,
      about: `${jobInput.value}`,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => {
      userName.textContent = data.name;
      userJob.textContent = data.about;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createNewCard = function () {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: `${photoNameInput.value}`,
      link: `${photoUrlInput.value}`,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteCard = function (cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
};

export const putLike = function (cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteLike = function (cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const changeAvatar = function () {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: `${avatarUrlInput.value}`,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((data) => (avatar.src = data.avatar))
    .catch((err) => {
      console.log(err);
    });
};
