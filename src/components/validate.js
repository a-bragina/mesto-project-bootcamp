const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${inputElement.classList[0]}_type_error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${inputElement.classList[0]}-error_active`);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${inputElement.classList[0]}_type_error`);
  errorElement.classList.remove(`${inputElement.classList[0]}-error_active`);
  errorElement.textContent = "";
};

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const hasEmptyInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.value;
  });
};

export const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("button_type_save-inactive");
    buttonElement.disabled = true;
  } else if (hasEmptyInput(inputList)) {
    buttonElement.classList.add("button_type_save-inactive");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("button_type_save-inactive");
    buttonElement.disabled = false;
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));
  const buttonElement = formElement.querySelector(".button_type_save");

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);

      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".form"));

  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};
enableValidation();
export { enableValidation };
