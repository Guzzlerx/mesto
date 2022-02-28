export default class Card {
  constructor(
    { link, name, likes, owner, _id },
    cardSelector, userId,
    { handleCardClick, handleTrashClick, handleLikeClick }
  ) {
    this._image = link;
    this._title = name;
    this._likesArray = likes;
    this._likesAmount = likes.length;
    this._cardOwnerId = owner._id;
    this._cardId = _id;
    this._cardSelector = cardSelector;
    this._openPopupZoomPhoto = handleCardClick;
    this._openPopupWithConfirmation = handleTrashClick;
    this._handleLikeClick = handleLikeClick;
    this._userId = userId;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__grid-item")
      .cloneNode(true);
  }

  generateElement() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".cards__like-btn");
    this._cardImage = this._element.querySelector(".cards__photo");
    this._cardTitle = this._element.querySelector(".cards__title");
    this._cardRemover = this._element.querySelector(".cards__trash");
    this._likeNumber = this._element.querySelector(".cards__like-number");

    this._setEventListeners();

    if (this._isCardLiked()) {
      this.likeCard();
    } else {
      this.dislikeCard();
    }

    this._cardImage.src = this._image;
    this._cardImage.alt = `Фотография: '${this._title}'`;
    this._cardTitle.textContent = this._title;
    this._likeNumber.textContent = this._likesAmount;

    return this._element;
  }

  _checkCardOwner() {
    if (this._cardOwnerId !== this._userId) {
      this._deleteCardRemover();
      return false;
    }
    return true;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this._likeNumber, this._cardId);
    });

    if (this._checkCardOwner()) {
      this._cardRemover.addEventListener("click", () => {
        this._openPopupWithConfirmation(this._element, this._cardId);
      });
    }
    this._cardImage.addEventListener("click", () => {
      this._openPopupZoomPhoto(this._image, this._title);
    });
  }

  _isCardLiked() {
    return this._likesArray.some(user => {
      return user._id === this._userId;
    });
  }

  dislikeCard() {
    this._likeButton.classList.remove("cards__like-btn_active");
  }

  likeCard() {
    this._likeButton.classList.add("cards__like-btn_active");
  }

  hasButtonAdditionalClass() {
    return this._likeButton.classList.contains('cards__like-btn_active');
  }

  _deleteCardRemover() {
    this._cardRemover.remove();
    this._cardRemover = null;
  }
}
