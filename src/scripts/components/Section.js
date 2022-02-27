export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItem(cardsList) {
    cardsList.forEach(item => {
      this._renderedElement = this._renderer(item);
      this._container.append(this._renderedElement);
    });
  }
}
