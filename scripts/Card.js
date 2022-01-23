export class Card {
    constructor(data, cardSelector, openPopupZoomPhoto) {
        this._image = data.link;
        this._title = data.name;
        this._cardSelector = cardSelector;
        this._openPopupZoomPhoto = openPopupZoomPhoto;
    }

    _getTemplate() {
        return document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.cards__grid-item')
            .cloneNode(true);
    }

    createElement() {
        this._element = this._getTemplate();
        this._setEventListeners();

        const cardImage = this._element.querySelector('.cards__photo');
        const cardTitle = this._element.querySelector('.cards__title');

        cardImage.src = this._image;
        cardImage.alt = `Фотография: '${this._title}'`;
        cardTitle.textContent = this._title;

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.cards__like').addEventListener('click', () => {
            this._likeCard();
        })
        this._element.querySelector('.cards__trash').addEventListener('click', () => {
            this._deleteCard();
        })
        this._element.querySelector('.cards__photo').addEventListener('click', () => {
            this._openPopupZoomPhoto(this);
        })
    }

    _likeCard() {
        this._element
            .querySelector('.cards__like')
            .classList
            .toggle('cards__like_active');
    }

    _deleteCard() {
        this._element.remove();
    }
}


export const initialCards = [
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