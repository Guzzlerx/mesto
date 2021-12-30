import { initialCards } from './initial-cards.js';

const body = document.querySelector('.body');
const content = document.querySelector('.content');
const buttonEditProfile = content.querySelector('.profile__button-edit-info'); // кнопка редактирования профиля
const buttonNewCard = content.querySelector('.profile__button-add-picture'); // кнопка добавления карточки
const popupProfile = document.querySelector('.popup_type_edit-profile'); // выбор модалки профиля
const popupNewCard = document.querySelector('.popup_type_add-card'); // выбор модалки новой карточки
const popupZoomPhoto = document.querySelector('.popup_type_zoom-photo');
const buttonCloseProfile = document.querySelector(
    '.popup__button-close_type_edit-profile'); // кнопка закрытия попапа профиля
const buttonCloseNewCard = document.querySelector(
    '.popup__button-close_type_add-card'); // кнопка закрытия попапа доб. карточки
const buttonCloseZoom = document.querySelector(
    '.popup__button-close_type_zoom-photo');
const formProfile = document.querySelector('.popup__form_type_edit-profile');   // форма профиля
const formNewCard = document.querySelector('.popup__form_type_add-card');
const profileName = content.querySelector('.profile__name');
const profileDescription = content.querySelector('.profile__description');
const inputName = formProfile.querySelector('.popup__input_type_name');
const inputDescription = formProfile.querySelector('.popup__input_type_description');
const inputPlace = formNewCard.querySelector('.popup__input_type_place');
const inputLink = formNewCard.querySelector('.popup__input_type_link');
const cardsContainer = document.querySelector('.cards__grid-list');     // ul для карточек
const cardsTemplate = document.querySelector('.cards-template').content;    //  template card(li)

function createCard(item) {
    const cardsItem = cardsTemplate
        .querySelector('.cards__grid-item')
        .cloneNode(true);                                       // при добавлении нового эл-та
    cardsItem.querySelector('.cards__title').textContent = item.name; // обязательно снова клонировать
    cardsItem.querySelector('.cards__photo').src = item.link;
    cardsItem.querySelector('.cards__photo').alt = `Фотография: '${item.name}'`;

    cardsItem.querySelector('.cards__like').addEventListener('click', (evt) => {  // повесили лайк
        evt.target.classList.toggle('cards__like_active');
    });

    cardsItem.querySelector('.cards__trash').addEventListener('click', (evt) => {  // повесили урну
        evt.target.closest('.cards__grid-item').remove();
    });

    cardsItem.querySelector('.cards__photo').addEventListener('click', () => { // добавили зум на карточки
        popupZoomPhoto.querySelector('.popup__photo').src = item.link;
        popupZoomPhoto.querySelector('.popup__photo').alt = `Фотография: '${item.name}'`;
        popupZoomPhoto.querySelector('.popup__title-zoom').textContent = item.name;
        openPopupZoomPhoto();
    });

    return cardsItem;
}

function addStartCards(item) {
    cardsContainer.append(createCard(item));
}

function addNewCard(item) {
    cardsContainer.prepend(createCard(item));
}

function openPopup(popup) {
    popup.classList.add('popup_active');
    body.classList.add('body_scroll-off');      // убрали скролл страницы
    body.addEventListener('keydown', closePopupByEscape);
    popup.addEventListener('click', closePopupByOverlayClick);
}

function openPopupProfile() {       //  открываем попап и заполняем инпуты данными из профиля
    openPopup(popupProfile);
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
}

function openPopupNewCard() {       //  открываем попап и заполняем инпуты данными из профиля
    openPopup(popupNewCard);
}

function openPopupZoomPhoto() {     //  открываем попап и заполняем инпуты данными из профиля
    openPopup(popupZoomPhoto);
}

function closePopup(popup) {        // закрываем попап
    popup.classList.remove('popup_active');
    body.classList.remove('body_scroll-off');
    body.removeEventListener('keydown', closePopupByEscape);
    popup.removeEventListener('click', closePopupByOverlayClick);
}

function closePopupProfile() {
    closePopup(popupProfile);
}

function closePopupNewCard() {
    closePopup(popupNewCard);
}

function closePopupZoom() {
    closePopup(popupZoomPhoto);
}

function closePopupByEscape(evt) {      // закрытие попапа клавишей Esc
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_active');
        closePopup(openedPopup);
    }
}

function closePopupByOverlayClick(evt) {        // закрытие попапа кликом на фон
    const popup = evt.currentTarget;
    if (evt.target === popup) {
        closePopup(popup);
    }
}

function formSubmitHandlerProfile() {          // нажимаем на кнопку сохранить и данные из инпутов сохраняются
    profileName.textContent = inputName.value;      // в профиле, после чего попап закрывается
    profileDescription.textContent = inputDescription.value;
    closePopupProfile();
}

function formSubmitHandlerNewCard(evt) {
    const newCard = {};
    newCard.name = inputPlace.value;
    newCard.link = inputLink.value;
    addNewCard(newCard);
    evt.target.reset();
    closePopupNewCard();
}

initialCards.forEach(addStartCards);
buttonEditProfile.addEventListener('click', openPopupProfile);
buttonNewCard.addEventListener('click', openPopupNewCard);
formProfile.addEventListener('submit', formSubmitHandlerProfile); // при нажатии на кнопку
formNewCard.addEventListener('submit', formSubmitHandlerNewCard); // формы с типом submit (отправки формы)
buttonCloseProfile.addEventListener('click', closePopupProfile);
buttonCloseNewCard.addEventListener('click', closePopupNewCard);
buttonCloseZoom.addEventListener('click', closePopupZoom);
