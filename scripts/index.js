import { initialCards, configValidation, buttonEditProfile, cardsContainer,
    formNewCard, buttonNewCard, formProfile } from './constants.js';
import Card from './Card.js';
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

const formNewCardValidator = new FormValidator(configValidation, formNewCard);
const formProfileInfoValidator = new FormValidator(configValidation, formProfile);

const startCardList = new Section({
    data: initialCards,
    renderer: item => {
        const newCard = new Card(item, '.cards-template', {
            handleCardClick: (image, place) => {
                const newPopup = new PopupWithImage('.popup_type_zoom-photo', { image, place });
                newPopup.open();
                newPopup.setEventListeners()
            }});
        const cardElement = newCard.generateElement();
        startCardList.addItem(cardElement);
    }
}, '.cards__grid-list');

buttonNewCard.addEventListener('click', () => {
    const popupNewCard = new PopupWithForm('.popup_type_add-card', {
        handleFormSubmit: inputValues => {
            const newCard = new Card(inputValues, '.cards-template', {
                handleCardClick: (image, place) => {
                    const newPopup = new PopupWithImage('.popup_type_zoom-photo', { image, place });
                    newPopup.open();
                    newPopup.setEventListeners()
                }});
            const cardElement = newCard.generateElement();
            cardsContainer.prepend(cardElement);
        }
    })

    popupNewCard.setEventListeners();
    popupNewCard.open();

    formNewCardValidator.enableValidation();
    formNewCardValidator.resetValidation();
})

buttonEditProfile.addEventListener('click', () => {
    const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', {
        handleFormSubmit: inputValues => {
            const userInfo = new UserInfo({
                userName: '.profile__name',
                userDescription: '.profile__description'
            })
            userInfo.setUserInfo(inputValues);
        }
    })

    popupEditProfile.setEventListeners();
    popupEditProfile.open();

    formProfileInfoValidator.enableValidation();
    formProfileInfoValidator.resetValidation();
})

startCardList.renderItem();
