export const configValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-submit",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const buttonEditProfile = document.querySelector(
  ".profile__button-edit-info"
); //кнопка редактирования профиля
export const buttonNewCard = document.querySelector(
  ".profile__button-add-picture"
); // кнопка добавления карточки
export const formProfile = document.querySelector(
  ".popup__form_type_edit-profile"
); // форма профиля
export const formNewCard = document.querySelector(".popup__form_type_add-card"); // форма новой карточки
export const inputTypeName = document.querySelector(".popup__input_type_name");
export const inputTypeDescription = document.querySelector(
  ".popup__input_type_description"
);
export const formSetAvatar = document.querySelector(
  ".popup__form_type_set-avatar"
);
export const buttonAvatar = document.querySelector(".profile__overlay-avatar");
