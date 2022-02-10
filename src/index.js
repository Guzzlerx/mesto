import './styles/index.css';
import {
    initialCards, configValidation, buttonEditProfile, cardsContainer,
    formNewCard, buttonNewCard, formProfile, inputTypeDescription,
    inputTypeName} from './scripts/utils/constants.js';
import Card from './scripts/components/Card.js';
import FormValidator from "./scripts/components/FormValidator.js";
import Section from "./scripts/components/Section.js";
import PopupWithImage from "./scripts/components/PopupWithImage.js";
import PopupWithForm from "./scripts/components/PopupWithForm.js";
import UserInfo from "./scripts/components/UserInfo.js";

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
                    newPopup.setEventListeners();
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
    const userInfo = new UserInfo({
        userName: '.profile__name',
        userDescription: '.profile__description'
    });

    const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', {
        handleFormSubmit: inputValues => {
            userInfo.setUserInfo(inputValues);
        }
    });

    popupEditProfile.setEventListeners();
    popupEditProfile.open();

    inputTypeName.value = userInfo.getUserInfo().name;
    inputTypeDescription.value = userInfo.getUserInfo().description;

    formProfileInfoValidator.enableValidation();
    formProfileInfoValidator.resetValidation();
})

startCardList.renderItem();