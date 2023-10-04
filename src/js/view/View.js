export class View {
  _data;

  render(data) {
    this._data = data;
    const html = this._renderMarkup();
    this._insertHTML(this._parentElement, html);
  }

  _insertHTML(parent, html) {
    parent.insertAdjacentHTML('beforeend', html);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
}
