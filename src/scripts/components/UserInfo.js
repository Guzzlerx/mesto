export default class UserInfo {
  constructor({ userName, userDescription, userAvatar }) {
    this._profileName = document.querySelector(userName);
    this._profileDescription = document.querySelector(userDescription);
    this._profileAvatar = document.querySelector(userAvatar);
  }

  setUserInfo({ name, about }) {
    this._profileName.textContent = name;
    this._profileDescription.textContent = about;
  }

  setUserAvatar({ avatar }) {
    this._profileAvatar.src = avatar;
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileDescription.textContent,
    };
  }
}
