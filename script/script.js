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

initialCards.forEach(addCard);