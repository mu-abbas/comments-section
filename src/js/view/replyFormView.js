import { View } from './View';

class FormView extends View {
  formListener(action) {
    this._form = action;
    document.addEventListener('click', this._formCall.bind(this));
  }

  _formCall(e) {
    const replyBtn = e.target.closest('.reply-btn');
    if (replyBtn) {
      this._parentElement = e.target.closest('.reply');
      if (!this._parentElement) this._parentElement = e.target.closest('.comment');
      const form = this._parentElement.nextElementSibling;
      if (form?.classList.contains('add-reply')) {
        form.remove();
      } else {
        document.querySelector('.add-reply')?.remove();
        this._form();
      }
    } else return;
  }

  _renderMarkup() {
    return `
      <form class="add-comment add-reply mg-top-minus" action="#">
          <picture class="block-content-img">
            <source srcset="${this._data.currentUser.image.webp}" />
            <img src="${this._data.currentUser.image.png}" alt="author photo" />
          </picture>
          <textarea required name="reply" placeholder="Add a reply..." class="add-comment-text"></textarea>
          <button class="btn add-comment-btn">Reply</button>
        </form>
    `;
  }
}

export default new FormView();
