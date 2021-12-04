let content = document.querySelector('.content');
let buttonEditProfile = content.querySelector('.profile__button-edit-info');  // кнопка редактирования профиля
let popup = document.querySelector('.popup');   // выбор модалки
let buttonCloseProfile = popup.querySelector('.popup__button-close');  // кнопка закрытия попапа
let formProfile = document.querySelector('.popup__form')   // форма профиля
let profileName = content.querySelector('.profile__name');
let profileDescription = content.querySelector('.profile__description');
let inputName = formProfile.querySelector('.popup__input_type_name');
let inputDescription = formProfile.querySelector('.popup__input_type_description');

function openPopup () {   //  открываем попап и заполняем инпуты данными из профиля
    popup.classList.add('popup_active')
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
}

function closePopup () {    // закрываем попап
    popup.classList.remove('popup_active')
}

function formSubmitHandler (evt) {  // нажимаем на кнопку сохранить и данные из инпутов сохраняются
    evt.preventDefault();           // в профиле, после чего попап закрывается
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    closePopup()
}

buttonEditProfile.addEventListener('click', openPopup)
buttonCloseProfile.addEventListener('click', closePopup)
formProfile.addEventListener('submit', formSubmitHandler);  // при нажатии на кнопку формы с типом submit (отправки формы)
