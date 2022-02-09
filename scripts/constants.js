export const initialCards = [
    {
        place: 'Sheeps',
        link: './images/there_are_more_sheep_than_people.jpg'
    },
    {
        place: 'Night sky',
        link: './images/night_sky_at_china.jpg'
    },
    {
        place: 'A small model',
        link: './images/a_very_small_model.jpg'
    },
    {
        place: 'Quiet woods',
        link: './images/a_walk_in_the_quiet_woods.jpg'
    },
    {
        place: 'Salmon River',
        link: './images/old_salmon_river.jpg'
    },
    {
        place: 'A lonely island',
        link: './images/the_lonely_island.jpg'
    }
];

export const configValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-submit',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

export const buttonEditProfile = document.querySelector('.profile__button-edit-info'); //кнопка редактирования профиля
export const buttonNewCard = document.querySelector('.profile__button-add-picture'); // кнопка добавления карточки
export const formProfile = document.querySelector('.popup__form_type_edit-profile');   // форма профиля
export const formNewCard = document.querySelector('.popup__form_type_add-card');   // форма новой карточки
export const cardsContainer = document.querySelector('.cards__grid-list');     // ul для карточек