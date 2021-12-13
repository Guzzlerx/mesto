const content = document.querySelector('.content');
const buttonEditProfile = content.querySelector('.profile__button-edit-info');  // кнопка редактирования профиля
const buttonNewCard = content.querySelector('.profile__button-add-picture'); // кнопка добавления карточки
const popupProfile = document.querySelector('.popup_type_edit-profile');   // выбор модалки профиля
const popupNewCard = document.querySelector('.popup_type_add-card');    // выбор модалки новой карточки
const buttonClose = document.querySelectorAll('.popup__button-close');  // кнопка закрытия попапа
const formProfile = document.querySelector('.popup__form_type_edit-profile');   // форма профиля
const formNewCard = document.querySelector('.popup__form_type_add-card');
const profileName = content.querySelector('.profile__name');
const profileDescription = content.querySelector('.profile__description');
const inputName = formProfile.querySelector('.popup__input_type_name');
const inputDescription = formProfile.querySelector('.popup__input_type_description');
const inputPlace = formNewCard.querySelector('.popup__input_type_place');
const inputLink = formNewCard.querySelector('.popup__input_type_link');
const initialCards = [
    {
        name: 'Sheeps',
        link: './images/there_are_more_sheep_than_people.jpg'
    },
    {
        name: 'Night sky',
        link: './images/night_sky_at_china.jpg'
    },
    {
        name: 'A small model',
        link: './images/a_very_small_model.jpg'
    },
    {
        name: 'Quiet woods',
        link: './images/a_walk_in_the_quiet_woods.jpg'
    },
    {
        name: 'Salmon River',
        link: './images/old_salmon_river.jpg'
    },
    {
        name: 'A lonely island',
        link: './images/the_lonely_island.jpg'
    }
];
const cardsContainer = document.querySelector('.cards__grid-list');  // ul для карточек
const cardsTemplate = document.querySelector('.cards-template').content;    //  template card(li)

function addCard(item) {
    let cardsItem = cardsTemplate.querySelector('.cards__grid-item').cloneNode(true); // при добавлении нового эл-та
    cardsItem.querySelector('.cards__title').textContent = item.name;                     // обязательно снова клонировать
    cardsItem.querySelector('.cards__photo').src = item.link;
    cardsContainer.append(cardsItem);
}

function openPopupProfile () {   //  открываем попап и заполняем инпуты данными из профиля
    popupProfile.classList.add('popup_active')
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
}

function openPopupNewCard () {   //  открываем попап и заполняем инпуты данными из профиля
    popupNewCard.classList.add('popup_active')
}

function closePopup () {    // закрываем попап
    popupProfile.classList.remove('popup_active');
    popupNewCard.classList.remove('popup_active');
    inputPlace.value = '';
    inputLink.value = '';
}

function formSubmitHandlerProfile (evt) {  // нажимаем на кнопку сохранить и данные из инпутов сохраняются
    evt.preventDefault();           // в профиле, после чего попап закрывается
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    closePopup()
}

function formSubmitHandlerNewCard (evt) {
    evt.preventDefault();
    let cardsItem = cardsTemplate.querySelector('.cards__grid-item').cloneNode(true);
    cardsItem.querySelector('.cards__title').textContent = inputPlace.value;
    cardsItem.querySelector('.cards__photo').src = inputLink.value;
    cardsContainer.prepend(cardsItem);
    inputPlace.value = '';
    inputLink.value = '';
    closePopup()
}

initialCards.forEach(addCard);
buttonEditProfile.addEventListener('click', openPopupProfile)
buttonNewCard.addEventListener('click', openPopupNewCard)
formProfile.addEventListener('submit', formSubmitHandlerProfile);  // при нажатии на кнопку формы с типом submit (отправки формы)
formNewCard.addEventListener('submit', formSubmitHandlerNewCard);
buttonClose.forEach(item => {
    item.addEventListener('click', closePopup);
})
