import { enableValidation } from "./validate.js";
import { setUserInfo, uploadCardsFromServer } from "./api.js";

import "./../styles/index.css";

uploadCardsFromServer();
setUserInfo();
enableValidation();
