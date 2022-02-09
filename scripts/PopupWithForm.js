import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, { handleFormSubmit }) {
        super(popupSelector);
        this._inputList = this._popup.querySelectorAll('.popup__input');
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popup.querySelector('.popup__form');
    }

    _getInputValues() {
        this._formValues = {};

        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        })

        return this._formValues;
    }

    open({}) {
        super.open();
    }

    close() {
        this._popupForm.reset();
        super.close();
    }

    _handleSubmit = evt => {
        evt.preventDefault();

        this._handleFormSubmit(this._getInputValues());

        this._popup.removeEventListener('submit', this._handleSubmit);

        this.close();
    }

    setEventListeners() {
        super.setEventListeners();

        this._popup.addEventListener('submit', this._handleSubmit);
    }
}