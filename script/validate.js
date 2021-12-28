// включение валидации вызовом enableValidation
// все настройки передаются при вызове
const enableValidation = (obj) => {                 // Добавляем слушателя каждой форме
    const formList = Array.from(document.querySelectorAll(obj.formSelector));

    formList.forEach(formElement => {
        formElement.addEventListener('submit', evt => {
            evt.preventDefault()
        });
        setEventListener(formElement, obj);
    })
}

const setEventListener = (formElement, obj) => {                                    // Из любой выбранной формы достаем поля и
    const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));  // добавляем им слушателей при каждом символе
    const buttonSubmit = formElement.querySelector('.popup__button-save');          // введенном или удаленном в поле
    toggleButtonSubmit(inputList, buttonSubmit, obj);
    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, obj);
            toggleButtonSubmit(inputList, buttonSubmit, obj);
        })
    })
};

const isValid = (formElement, inputElement, obj) => {               // проверяем на валидность выбранное поле
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, obj);
    } else {
        hideInputError(formElement, inputElement, obj);
    }
};

const toggleEnterSubmit = evt => {              // функция удаления стандартного сабмита по Enter
    if (evt.key === 'Enter') {
        evt.preventDefault();
    }
}

const toggleButtonSubmit = (inputList, buttonElement, obj) => {
    if (hasInvalidInput(inputList)) {                               // при значении true
        buttonElement.classList.add(obj.inactiveButtonClass);       // делаем кнопку неактивной
        inputList.forEach(input => {
            input.addEventListener('keydown', toggleEnterSubmit);   // убираем стандартный сабмит по Enter
        })
    } else {
        buttonElement.classList.remove(obj.inactiveButtonClass);
        inputList.forEach(input => {
            input.removeEventListener('keydown', toggleEnterSubmit);     // добавляем стандартный сабмит по Enter
        })
    }
};

const hasInvalidInput = inputList => {                      // если каждое поле валидно - возвращаем false,
     return inputList.some(input => {                       // если нет - true
         return !input.validity.valid;
     })
};

const showInputError = (formElement, inputElement, obj) => {                    // если поле не валидно - добавляем ошибку
    const inputError = formElement.querySelector(`.${inputElement.id}-error`);  // ошибка пишется в span
    inputElement.classList.add(obj.inputErrorClass);
    inputError.textContent = inputElement.validationMessage;         // пишем в спан браузерный текст ошибки по умолчанию
    inputError.classList.add(obj.errorClass);

};

const hideInputError = (formElement, inputElement, obj) => {                // валидно - скрываем ошибку
    const inputError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(obj.inputErrorClass);
    inputError.textContent = '';
    inputError.classList.remove(obj.errorClass);
};


enableValidation ({                         // вызываем функцию передавая аргументом объект (дан по заданию)
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});
