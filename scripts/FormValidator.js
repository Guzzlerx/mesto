export default class FormValidator {
    constructor(config, formElement) {
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement
            .querySelectorAll(this._inputSelector));
        this._submitButton = this._formElement
            .querySelector(this._submitButtonSelector);
    }

    enableValidation() {
        this._setEventListener();
    }

    _setEventListener() {
        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._toggleButtonSubmit();
            })
        })
    }

    resetValidation() {
        this._toggleButtonSubmit(this._inputList, this._submitButton);

        this._inputList.forEach(inputElement => {
            this._hideInputError(inputElement);
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

    _toggleButtonSubmit() {
        if (this._hasInvalidInput()) {
            this._submitButton.disabled = true;
            this._submitButton.classList.add(this._inactiveButtonClass);
        } else {
            this._submitButton.disabled = false;
            this._submitButton.classList.remove(this._inactiveButtonClass);
        }
    }

    _hasInvalidInput() {
        return this._inputList.some(inputElement => {
            return !inputElement.validity.valid;
        })
    }
}
