export default class UserInfo {
    constructor({ userName, userDescription }) {
        this._profileName = document.querySelector(userName);
        this._profileDescription = document.querySelector(userDescription);
    }

    setUserInfo({ name, description }) {
        this._profileName.textContent = name;
        this._profileDescription.textContent = description;
    }

    getUserInfo() {
        return {
            name: this._profileName.textContent,
            description: this._profileDescription.textContent
        }
    }

}