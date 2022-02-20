export default class Api {
    constructor({ baseUrl, headers }) {
        this._profileUrl = baseUrl;
        this._headers = headers;
        this._cardsUrl = 'https://mesto.nomoreparties.co/v1/cohort36/cards';
    }

    getUserInfo() {
        return fetch(this._profileUrl, {
            headers: this._headers
        })
            .then(res => this._checkResponseStatus(res))
            .catch(err => console.error(err));
    }

    _checkResponseStatus(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialCards() {
        return fetch(this._cardsUrl, {
            headers: this._headers
        })
            .then(res => this._checkResponseStatus(res))
            .catch(err => console.error(err));
    }

    setUserInfo(userInfoObj) {
        return fetch(this._profileUrl, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify(userInfoObj),
        })
            .then(res => this._checkResponseStatus(res))
            .catch(err => console.error(err));
    }

    addNewCard(cardDataObj) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort36/cards', {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify(cardDataObj),
        })
            .then(res => this._checkResponseStatus(res))
            .catch(err => console.error(err));
    }
}



