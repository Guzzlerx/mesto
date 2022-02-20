import './index.css';
import {
    initialCards, configValidation, buttonEditProfile,
    formNewCard, buttonNewCard, formProfile, inputTypeDescription,
    inputTypeName } from '../scripts/utils/constants.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';

const formNewCardValidator = new FormValidator(configValidation, formNewCard);
const formProfileInfoValidator = new FormValidator(configValidation, formProfile);

// https://nomoreparties.co/v1/cohort36/users/me
// https://jsonplaceholder.typicode.com/posts


const myPageApi = new Api({
    baseUrl: 'https://nomoreparties.co/v1/cohort36/users/me',
    headers: {
        authorization: '24bb909b-945c-4159-8387-3cc3e3137134',
        'Content-Type': 'application/json'
    }
})

myPageApi.getUserInfo()
    .then((data => {
        profileInfo.setUserInfo(data);
    }))

// myPageApi.getInitialCards()
//     .then(data => {
//         console.log(data);
//         const cardList = new Section({
//             data,
//             renderer: item => {
//                 return createCard(item);
//             }
//         }, '.cards__grid-list')
//         return cardList;
//     })
//     .then(cardList => cardList.renderItem())

const cardList = Promise.resolve(myPageApi.getInitialCards()
    .then(data => {
        const cardList = new Section({
            data,
            renderer: item => {
                return createCard(item);
            }
        }, '.cards__grid-list')
        return cardList;
    }))

cardList.then(res => {
    res.renderItem();
})




function deleteMyShit() {
    fetch("https://mesto.nomoreparties.co/v1/cohort36/cards", {
        headers: {
            authorization: '24bb909b-945c-4159-8387-3cc3e3137134',
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(res => res.forEach(item => {
            if (item.owner._id === 'ba78031e0402196520c06f61') {
                fetch(`https://mesto.nomoreparties.co/v1/cohort36/cards/${item._id}`, {
                    headers: {
                        authorization: '24bb909b-945c-4159-8387-3cc3e3137134',
                        'Content-Type': 'application/json'
                    },
                    method: 'DELETE',
                })
            }
        }))
}
// deleteMyShit()

function createCard(item) {
    const newCard = new Card(item, '.cards-template', {
        handleCardClick: (image, name) => {
            popupWithImage.open(image, name);
        }
    })
    return newCard.generateElement();
}

const popupWithImage = new PopupWithImage('.popup_type_zoom-photo');

const popupNewCard = new PopupWithForm('.popup_type_add-card', {
    handleFormSubmit: formValues => {
        myPageApi.addNewCard(formValues)
            .then(({ name, link }) => {
                const cardElement = createCard({name, link});
                cardList.then(cardList => cardList.addItem(cardElement));
            })
    }
})

const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', {
    handleFormSubmit: formValues => {
        myPageApi.setUserInfo(formValues)
            .then(userInfo => profileInfo.setUserInfo(userInfo));
    }
})

const profileInfo = new UserInfo({
    userName: '.profile__name',
    userDescription: '.profile__description',
    userAvatar: '.profile__avatar',
});

buttonEditProfile.addEventListener('click', () => {
    const { name, about } = profileInfo.getUserInfo();

    inputTypeName.value = name;
    inputTypeDescription.value = about;

    popupEditProfile.open()

    formProfileInfoValidator.resetValidation();
})

buttonNewCard.addEventListener('click', () => {
    popupNewCard.open();

    formNewCardValidator.resetValidation();
})

// cardList.renderItem();

popupWithImage.setEventListeners();
popupNewCard.setEventListeners();
popupEditProfile.setEventListeners();

formNewCardValidator.enableValidation();
formProfileInfoValidator.enableValidation();




// const cardList = Promise.resolve(myPageApi.getInitialCards())
//     .then(data => {
//     const cardList = new Section({
//         data,
//         renderer: item => {
//             return createCard(item);
//         }
//     }, '.cards__grid-list')
//     return cardList;
// })

// const cardList = new Promise((resolve, reject) => {
//     resolve(myPageApi.getInitialCards()
//         .then(data => {
//             const cardList = new Section({
//                 data,
//                 renderer: item => {
//                     return createCard(item);
//                 }}, '.cards__grid-list')
//             return cardList;
//         }))
//     reject('Ошибка!')
// })
// myPageApi.getInitialCards().then(res => console.log(res))

// const cardList2 = new Promise((resolve, reject) => {
//
// })

// const cardList = new Section({
//     data: initialCards,
//     renderer: item => {
//         return createCard(item);
//     }
// }, '.cards__grid-list');

// cardList.then(cardList => cardList.renderItem())