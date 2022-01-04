import { initialCards } from './initial-cards.js';
import { configValidation } from "./validate.js";
import { clearValidation } from "./validate.js";

const body = document.querySelector('.body');
const content = document.querySelector('.content');
const buttonEditProfile = content.querySelector('.profile__button-edit-info'); //кнопка редактирования профиля
const buttonNewCard = content.querySelector('.profile__button-add-picture'); // кнопка добавления карточки
const popupArray = Array.from(document.querySelectorAll('.popup'));     // массив всех попапов;
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
const cardPhoto = popupZoomPhoto.querySelector('.popup__photo');
const cardTitle = popupZoomPhoto.querySelector('.popup__title-zoom');
const cardsContainer = document.querySelector('.cards__grid-list');     // ul для карточек
const cardsTemplate = document.querySelector('.cards-template').content;    //  template card(li)

function createCard(item) {
    const cardsItem = cardsTemplate
        .querySelector('.cards__grid-item')                  // при добавлении нового эл-та
        .cloneNode(true);                                       // обязательно снова клонировать
    const cardImage = cardsItem.querySelector('.cards__photo');
    const cardTitle = cardsItem.querySelector('.cards__title');
    const cardLike = cardsItem.querySelector('.cards__like');
    const cardRemover = cardsItem.querySelector('.cards__trash');

    cardTitle.textContent = item.name;
    cardImage.src = item.link;
    cardImage.alt = `Фотография: '${item.name}'`;

    cardLike.addEventListener('click', (evt) => {    // повесили лайк
        evt.target.classList.toggle('cards__like_active');
    });

    cardRemover.addEventListener('click', (evt) => {    // повесили урну
        evt.target.closest('.cards__grid-item').remove();
    });

    cardImage.addEventListener('click', () => {     // добавили зум на карточки
        openPopupZoomPhoto(item);
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
}

function openPopupProfile() {       //  открываем попап и заполняем инпуты данными из профиля
    openPopup(popupProfile);
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
    clearValidation(formProfile, configValidation);
}

function openPopupNewCard() {       //  открываем попап и заполняем инпуты данными из профиля
    openPopup(popupNewCard);
    clearValidation(formNewCard, configValidation);
}

function openPopupZoomPhoto(item) {     //  открываем попап и заполняем инпуты данными из профиля
    openPopup(popupZoomPhoto);
    cardPhoto.src = item.link;
    cardPhoto.alt = `Фотография: '${item.name}'`;
    cardTitle.textContent = item.name;
}

function closePopup(popup) {        // закрываем попап
    popup.classList.remove('popup_active');
    body.classList.remove('body_scroll-off');
    body.removeEventListener('keydown', closePopupByEscape);
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

function handleFormProfileSubmit() {               // нажимаем на кнопку сохранить и данные из инпутов сохраняются
    profileName.textContent = inputName.value;      // в профиле, после чего попап закрывается
    profileDescription.textContent = inputDescription.value;
    closePopupProfile();
}

function handleFormNewCardSubmit(evt) {
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
formProfile.addEventListener('submit', handleFormProfileSubmit); // при нажатии на кнопку
formNewCard.addEventListener('submit', handleFormNewCardSubmit); // формы с типом submit (отправки формы)
buttonCloseProfile.addEventListener('click', closePopupProfile);
buttonCloseNewCard.addEventListener('click', closePopupNewCard);
buttonCloseZoom.addEventListener('click', closePopupZoom);
popupArray.forEach(popup => {
    popup.addEventListener('click', closePopupByOverlayClick);
})
