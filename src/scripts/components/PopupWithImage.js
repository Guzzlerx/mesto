import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector, { image, place }) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__photo');
        this._popupTitle = this._popup.querySelector('.popup__title-zoom');
        this._cardImage = image;
        this._cardTitle = place;
    }

    open() {
        super.open();
        this._popupImage.src = this._cardImage;
        this._popupImage.alt = `Фотография: '${this._cardImage}'`;
        this._popupTitle.textContent = this._cardTitle;
    }
}