import "./index.css";
import {
  configValidation,
  buttonEditProfile,
  formSetAvatar,
  formNewCard,
  buttonNewCard,
  buttonAvatar,
  formProfile,
  inputTypeDescription,
  inputTypeName,
} from "../scripts/utils/constants.js";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Api from "../scripts/components/Api.js";
import PopupWithConfirmation from "../scripts/components/PopupWithConfirmation";

const formNewCardValidator = new FormValidator(configValidation, formNewCard);
const formProfileInfoValidator = new FormValidator(
  configValidation,
  formProfile
);
const formSetAvatarValidator = new FormValidator(
  configValidation,
  formSetAvatar
);

const profileInfo = new UserInfo({
  userName: ".profile__name",
  userDescription: ".profile__description",
  userAvatar: ".profile__avatar",
});

const myPageApi = new Api({
  baseUrl: "https://nomoreparties.co/v1/cohort36/users/me",
  headers: {
    authorization: "24bb909b-945c-4159-8387-3cc3e3137134",
    "Content-Type": "application/json",
  },
});
// "ba78031e0402196520c06f61"

const userId = myPageApi.getUserInfo()
    .then(data => data._id)
    .catch(err => console.error(err));

const cardList = new Section({
  renderer: item => {
    return createCard(item);
  }
}, '.cards__grid-list')

function createCard(item) {
  const newCard = new Card(item, ".cards-template", userId, {
    handleCardClick: (image, name) => {
      popupWithImage.open(image, name);
    },
    handleTrashClick: (cardElement, cardId) => {
      popupDeleteCard.open(cardElement, cardId);
    },
    handleLikeClick: (cardLikeNumber, cardId) => {
      myPageApi
        .getInitialCards()
        .then((cardsArray) => {
          return cardsArray.find((card) => card._id === cardId);
        })
        .then((card) => {
          if (
            card.likes.some((user) => user._id === "ba78031e0402196520c06f61")
          ) {
            myPageApi.likeCard(card._id, "DELETE").then((res) => {
              newCard.dislikeCard();
              cardLikeNumber.textContent = res.likes.length;
            });
          } else {
            myPageApi.likeCard(card._id, "PUT").then((res) => {
              newCard.likeCard();
              cardLikeNumber.textContent = res.likes.length;
            });
          }
        });
    },
  });
  return newCard.generateElement();
}

const popupWithImage = new PopupWithImage(".popup_type_zoom-photo");

const popupNewCard = new PopupWithForm(".popup_type_add-card", {
  handleFormSubmit: (formValues, popupButtonSubmit) => {
    renderLoading(true, popupButtonSubmit, popupButtonSubmit.textContent);
    myPageApi
      .addNewCard(formValues)
      .then(({ name, link, likes, owner, _id }) => {
        const cardElement = createCard({ name, link, likes, owner, _id });
        cardList.addItem(cardElement);
      })
      .finally(() => {
        renderLoading(false, popupButtonSubmit, "Создать");
      });
  },
});

const popupEditProfile = new PopupWithForm(".popup_type_edit-profile", {
  handleFormSubmit: (formValues, popupButtonSubmit) => {
    renderLoading(true, popupButtonSubmit, popupButtonSubmit.textContent);
    myPageApi
      .setUserInfo(formValues)
      .then((userInfo) => {
        profileInfo.setUserInfo(userInfo);
      })
      .finally(() => {
        renderLoading(false, popupButtonSubmit, "Сохранить");
      });
  },
});

const popupSetAvatar = new PopupWithForm(".popup_type_set-avatar", {
  handleFormSubmit: (formValue, popupButtonSubmit) => {
    renderLoading(true, popupButtonSubmit, popupButtonSubmit.textContent);
    myPageApi
      .setUserAvatar(formValue)
      .then((res) => {
        profileInfo.setUserAvatar(res);
      })
      .finally(() => {
        renderLoading(false, popupButtonSubmit, "Сохранить");
      });
  },
});

const popupDeleteCard = new PopupWithConfirmation(".popup_type_confirm", {
  handleFormSubmit: (element, id) => {
    myPageApi.deleteCard(id).then(() => {
      element.remove();
    });
  },
});

function renderLoading(isLoading, buttonSubmit, buttonSubmitText) {
  if (isLoading) {
    buttonSubmit.textContent = "Сохранение...";
  } else {
    buttonSubmit.textContent = buttonSubmitText;
  }
}

buttonEditProfile.addEventListener("click", () => {
  const { name, about } = profileInfo.getUserInfo();

  inputTypeName.value = name;
  inputTypeDescription.value = about;

  popupEditProfile.open();

  formProfileInfoValidator.resetValidation();
});

buttonNewCard.addEventListener("click", () => {
  popupNewCard.open();

  formNewCardValidator.resetValidation();
});

buttonAvatar.addEventListener("click", () => {
  popupSetAvatar.open();

  formSetAvatarValidator.resetValidation();
});

myPageApi.getUserInfo().then((data) => {
  profileInfo.setUserInfo(data);
  profileInfo.setUserAvatar(data);
});

myPageApi.getInitialCards().then(initialCards => {
  cardList.renderItem(initialCards);
})

popupWithImage.setEventListeners();
popupNewCard.setEventListeners();
popupEditProfile.setEventListeners();
popupDeleteCard.setEventListeners();
popupSetAvatar.setEventListeners();

formNewCardValidator.enableValidation();
formProfileInfoValidator.enableValidation();
formSetAvatarValidator.enableValidation();
