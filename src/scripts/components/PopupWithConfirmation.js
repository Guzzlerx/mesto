import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  open(cardElement, cardId) {
    super.open();

    this._cardElement = cardElement;
    this._cardId = cardId;
  }

  _handleSubmit = (evt) => {
    evt.preventDefault();

    this._handleFormSubmit(this._cardElement, this._cardId);

    this.close();
  };

  setEventListeners() {
    super.setEventListeners();

    this._popup.addEventListener("submit", this._handleSubmit);
  }
}
