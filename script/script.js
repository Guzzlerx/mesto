let content = document.querySelector('.content');
let buttonEditProfile = content.querySelector('.profile__button-edit-info');
let popup = document.querySelector('.popup');
let buttonCloseProfile = popup.querySelector('.popup__button-close');

function toggleClass () {
    popup.classList.toggle('popup_off')
}

buttonEditProfile.addEventListener('click', toggleClass)
buttonCloseProfile.addEventListener('click', toggleClass)

let formProfile = document.querySelector('.popup__container')
let profileName = content.querySelector('.profile__name');
let profileDescription = content.querySelector('.profile__description');
let inputName = formProfile.querySelector('.popup__input_type_name');
let inputDescription = formProfile.querySelector('.popup__input_type_description');

// inputName.setAttribute('value', `${profileName.textContent}`);
// inputDescription.setAttribute('value', `${profileDescription.textContent}`);

inputName.value = profileName.textContent;
inputDescription.value = profileDescription.textContent;

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
}

formProfile.addEventListener('submit', formSubmitHandler);

buttonLike = content.querySelectorAll('.cards__like');

buttonLike.forEach(item =>{
    item.addEventListener('click', function () {
        item.classList.toggle('cards__like_active');
    })
})



