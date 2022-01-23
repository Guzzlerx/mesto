export class FormValidator {
    constructor(config, formElement) {
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._formElement = formElement;
    }

    enableValidation() {
        this._formElement.addEventListener('submit', evt => {
            evt.preventDefault()
        })
        this._setEventListener()
    }

    _setEventListener() {
        const inputList = Array.from(this._formElement
            .querySelectorAll(this._inputSelector));
        const buttonSubmit = this._formElement
            .querySelector(this._submitButtonSelector);

        inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._toggleButtonSubmit(inputList, buttonSubmit);
            })
        })
    }

    _isValid(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _showInputError(inputElement) {
        const inputError = this._formElement
            .querySelector(`.${inputElement.id}-error`)

        inputElement.classList.add(this._inputErrorClass);
        inputError.classList.add(this._errorClass);
        inputError.textContent = inputElement.validationMessage;
    }

    _hideInputError(inputElement) {
        const inputError = this._formElement
            .querySelector(`.${inputElement.id}-error`)

        inputElement.classList.remove(this._inputErrorClass);
        inputError.classList.remove(this._errorClass);
        inputError.textContent = '';
    }

    _toggleButtonSubmit(inputList, buttonSubmit) {
        if (this._hasInvalidInput(inputList)) {
            buttonSubmit.disabled = true;
            buttonSubmit.classList.add(this._inactiveButtonClass);
        } else {
            buttonSubmit.disabled = false;
            buttonSubmit.classList.remove(this._inactiveButtonClass);
        }
    }

    _hasInvalidInput(inputList) {
        return inputList.some(inputElement => {
            return !inputElement.validity.valid;
        })
    }

    _clearValidation() {
        const inputList = Array.from(this._formElement
            .querySelectorAll(this._inputSelector));
        const buttonSubmit = this._formElement
            .querySelector(this._submitButtonSelector);

        this._toggleButtonSubmit(inputList, buttonSubmit);

        inputList.forEach(inputElement => {
            this._hideInputError(inputElement);
        })
    }
}

export const configValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-submit',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};
