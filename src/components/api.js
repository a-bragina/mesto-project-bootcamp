import { checkResponse } from "./utils.js";

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
  }).then(checkResponse);
};
export let likedByUser;
export const uploadCardsFromServer = function () {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(checkResponse);
};

export const editProfileInfo = function (name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  }).then(checkResponse);
};

export const createNewCard = function (name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  }).then(checkResponse);
};

export const deleteCard = function (cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
};

export const putLike = function (cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(checkResponse);
};

export const deleteLike = function (cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
};

export const changeAvatar = function (avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar,
    }),
  }).then(checkResponse);
};
