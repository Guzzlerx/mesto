import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._inputList = this._popup.querySelectorAll(".popup__input");
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._popupButtonSubmit = this._popup.querySelector(
      ".popup__button-submit"
    );
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  close() {
    super.close();

    this._popupForm.reset();
  }

  _handleSubmit = (evt) => {
    evt.preventDefault();

    this._handleFormSubmit(this._getInputValues(), this._popupButtonSubmit);
    this.close();
  };

  setEventListeners() {
    super.setEventListeners();

    this._popup.addEventListener("submit", this._handleSubmit);
  }
}
