import { View } from './View';

class FormView extends View {
  formListener(action) {
    this._action = action;
    document.addEventListener('click', this.formCall.bind(this));
  }

  formCall(e) {
    const replyBtn = e.target.closest('.reply-btn');
    if (replyBtn) {
      this._parentElement = e.target.closest('.reply');
      if (!this._parentElement) this._parentElement = e.target.closest('.comment');
      this._action();
    } else return;
  }

  _renderMarkup() {
    return `
      <form class="add-comment add-reply mg-top-minus" action="#">
          <picture class="block-content-img">
            <source srcset="${this._data.currentUser.image.webp}" />
            <img src="${this._data.currentUser.image.png}" alt="author photo" />
          </picture>
          <textarea required placeholder="Add a reply..." class="add-comment-text"></textarea>
          <button class="btn add-comment-btn">Reply</button>
        </form>
    `;
  }
}

export default new FormView();
