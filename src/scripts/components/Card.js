export default class Card {
    constructor({ link, place }, cardSelector, { handleCardClick }) {
        this._image = link;
        this._title = place;
        this._cardSelector = cardSelector;
        this._openPopupZoomPhoto = handleCardClick;
    }

    _getTemplate() {
        return document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.cards__grid-item')
            .cloneNode(true);
    }

    generateElement() {
        this._element = this._getTemplate();
        this._likeButton = this._element.querySelector('.cards__like');
        this._cardImage = this._element.querySelector('.cards__photo');
        this._cardTitle = this._element.querySelector('.cards__title');

        this._setEventListeners();

        this._cardImage.src = this._image;
        this._cardImage.alt = `Фотография: '${this._title}'`;
        this._cardTitle.textContent = this._title;

        return this._element;
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', ()=> {
            this._likeCard();
        })
        this._element.querySelector('.cards__trash').addEventListener('click', () => {
            this._deleteCard();
        })
        this._cardImage.addEventListener('click', () => {
            this._openPopupZoomPhoto(this._image, this._title);
        })
    }

    _likeCard() {
        this._likeButton
            .classList
            .toggle('cards__like_active');
    }

    _deleteCard() {
        this._element.remove();
    }
}