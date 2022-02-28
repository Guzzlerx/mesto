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

let ownerId;
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

const cardList = new Section({
  renderer: item => {
    return createCard(item);
  }
}, '.cards__grid-list')

function createCard(item) {
  const newCard = new Card(item, ".cards-template", ownerId, {
    handleCardClick: (image, name) => {
      popupWithImage.open(image, name);
    },
    handleTrashClick: (cardElement, cardId) => {
      popupDeleteCard.open(cardElement, cardId);
    },
    handleLikeClick: (cardLikeNumber, cardId) => {
      if (newCard.hasButtonAdditionalClass()) {
          myPageApi.likeCard(cardId, "DELETE")
              .then((res) => {
                newCard.dislikeCard();
                cardLikeNumber.textContent = res.likes.length;
        })
              .catch(err => {
                console.error(err);
            })
      } else {
          myPageApi.likeCard(cardId, "PUT")
              .then((res) => {
                  newCard.likeCard();
                  cardLikeNumber.textContent = res.likes.length;
        })
              .catch(err => {
                  console.error(err);
            })
      }
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
        popupNewCard.close();
      })
      .catch(err => {
        console.error(err);
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
        popupEditProfile.close();
      })
      .catch(err => {
        console.error(err);
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
        popupSetAvatar.close();
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        renderLoading(false, popupButtonSubmit, "Сохранить");
      });
  },
});

const popupDeleteCard = new PopupWithConfirmation(".popup_type_confirm", {
  handleFormSubmit: (element, id) => {
    myPageApi.deleteCard(id)
        .then(() => {
          element.remove();
          element = null;
        })
        .catch(err => {
          console.error(err);
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

Promise.all([myPageApi.getUserInfo(), myPageApi.getInitialCards()])
    .then(data => {
        const [ userInfo, initialCards ] = data;
        ownerId = userInfo._id;

        profileInfo.setUserInfo(userInfo);
        profileInfo.setUserAvatar(userInfo);

        cardList.renderItem(initialCards);
    })
    .catch(err => {
        console.error(err);
    });

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

popupWithImage.setEventListeners();
popupNewCard.setEventListeners();
popupEditProfile.setEventListeners();
popupDeleteCard.setEventListeners();
popupSetAvatar.setEventListeners();

formNewCardValidator.enableValidation();
formProfileInfoValidator.enableValidation();
formSetAvatarValidator.enableValidation();
