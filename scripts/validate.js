export const configValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-submit',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
}

const enableValidation = (obj) => {                                     // Добавляем слушателя каждой форме
    const formList = Array.from(document.querySelectorAll(obj.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListener(formElement, obj);
    });
};

const setEventListener = (formElement, obj) => {       // Из любой выбранной формы достаем поля и добавляем им
    const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));   // слушателей при каждом символе
    const buttonSubmit = formElement.querySelector(obj.submitButtonSelector);   // введенном или удаленном в поле
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, obj);
            toggleButtonSubmit(inputList, buttonSubmit, obj);
        });
    });
};

const isValid = (formElement, inputElement, obj) => {           // проверяем на валидность выбранное поле
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, obj);
    } else {
        hideInputError(formElement, inputElement, obj);
    }
};

export const toggleButtonSubmit = (inputList, buttonElement, obj) => {
    if (hasInvalidInput(inputList)) {                                   // при значении true
        buttonElement.classList.add(obj.inactiveButtonClass);           // делаем кнопку неактивной
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(obj.inactiveButtonClass);
        buttonElement.disabled = false;
    }
};

const hasInvalidInput = (inputList) => {                // если каждое поле валидно - возвращаем false,
    return inputList.some((input) => {                  // если нет - true
        return !input.validity.valid;
    });
};

const showInputError = (formElement, inputElement, obj) => {             // если поле не валидно - добавляем ошибку
    const inputError = formElement.querySelector(`.${inputElement.id}-error`); // ошибка пишется в span
    inputElement.classList.add(obj.inputErrorClass);
    inputError.textContent = inputElement.validationMessage;    // пишем в спан браузерный текст ошибки по умолчанию
    inputError.classList.add(obj.errorClass);
};

const hideInputError = (formElement, inputElement, obj) => {            // валидно - скрываем ошибку
    const inputError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(obj.inputErrorClass);
    inputError.textContent = '';
    inputError.classList.remove(obj.errorClass);
};

export const clearValidation = (form, obj) => {                 // проверяем форму на валидность при открытии
    const inputList = Array.from(form.querySelectorAll(obj.inputSelector));  // и скрываем ошибки
    const buttonSubmit = form.querySelector(obj.submitButtonSelector);
    toggleButtonSubmit(inputList, buttonSubmit, obj);
    inputList.forEach(inputItem => {
        hideInputError(form, inputItem, obj)
    })
}

enableValidation(configValidation);