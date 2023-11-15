import { View } from './View';

class commentFormView extends View {
  _parentElement = document.querySelector('.main');

  _renderMarkup() {
    return `
    <form class="add-comment main-form" name="comment" action="#" style="order:999;">
        <picture class="block-content-img">
          <source srcset="${this._data.currentUser.image.webp}" />
          <img src="${this._data.currentUser.image.png}" alt="author photo" />
        </picture>
        <textarea required name="comment" placeholder="Add a comment..." class="add-comment-text"></textarea>
        <button class="btn add-comment-btn">Send</button>
      </form>
    `;
  }
}

export default new commentFormView();
