import sheepsImage from '../../images/there_are_more_sheep_than_people.jpg';
import nightSkyImage from '../../images/night_sky_at_china.jpg';
import smallModelImage from '../../images/a_very_small_model.jpg';
import quietWoodsImage from '../../images/a_walk_in_the_quiet_woods.jpg';
import salmonRiverImage from '../../images/old_salmon_river.jpg';
import lonelyIslandImage from '../../images/the_lonely_island.jpg';

export const initialCards = [
    {
        name: 'Sheeps',
        link: sheepsImage
    },
    {
        name: 'Night sky',
        link: nightSkyImage
    },
    {
        name: 'A small model',
        link: smallModelImage
    },
    {
        name: 'Quiet woods',
        link: quietWoodsImage
    },
    {
        name: 'Salmon River',
        link: salmonRiverImage
    },
    {
        name: 'A lonely island',
        link: lonelyIslandImage
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
export const inputTypeName = document.querySelector('.popup__input_type_name');
export const inputTypeDescription = document.querySelector('.popup__input_type_description');