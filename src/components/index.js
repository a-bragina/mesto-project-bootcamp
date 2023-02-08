import { enableValidation } from "./validate.js";

import { userName } from "./utils.js";
import { setUserInfo, uploadCardsFromServer } from "./api.js";

import "./../styles/index.css";

setUserInfo();
enableValidation();
uploadCardsFromServer();
