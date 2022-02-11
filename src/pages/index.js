import './index.css';
import {
    initialCards, configValidation, buttonEditProfile,
    formNewCard, buttonNewCard, formProfile, inputTypeDescription,
    inputTypeName } from '../scripts/utils/constants.js';
import Card from '../scripts/components/Card.js';
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";

const formNewCardValidator = new FormValidator(configValidation, formNewCard);
const formProfileInfoValidator = new FormValidator(configValidation, formProfile);

const cardList = new Section({
    data: initialCards,
    renderer: item => {
        return createCard(item);
    }
}, '.cards__grid-list');

function createCard(item) {
    const newCard = new Card(item, '.cards-template', {
        handleCardClick: (image, place) => {
            popupWithImage.open(image, place);
        }
    })
    return newCard.generateElement();
}

const popupWithImage = new PopupWithImage('.popup_type_zoom-photo');

const popupNewCard = new PopupWithForm('.popup_type_add-card', {
    handleFormSubmit: formValues => {
        const newCardElement = createCard(formValues);
        cardList.addItem(newCardElement);
    }
})

const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', {
    handleFormSubmit: formValues => {
        profileInfo.setUserInfo(formValues);
    }
})

const profileInfo = new UserInfo({
    userName: '.profile__name',
    userDescription: '.profile__description'
});

buttonEditProfile.addEventListener('click', () => {
    const { name, description } = profileInfo.getUserInfo();

    inputTypeName.value = name;
    inputTypeDescription.value = description;

    popupEditProfile.open()

    formProfileInfoValidator.resetValidation();
})

buttonNewCard.addEventListener('click', () => {
    popupNewCard.open();

    formNewCardValidator.resetValidation();
})

cardList.renderItem();

popupWithImage.setEventListeners();
popupNewCard.setEventListeners();
popupEditProfile.setEventListeners();

formNewCardValidator.enableValidation();
formProfileInfoValidator.enableValidation();