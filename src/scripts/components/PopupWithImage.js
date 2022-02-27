import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup__photo");
    this._popupTitle = this._popup.querySelector(".popup__title-zoom");
  }

  open(image, name) {
    super.open();
    this._popupImage.src = image;
    this._popupImage.alt = `Фотография: '${name}'`;
    this._popupTitle.textContent = name;
  }
}
