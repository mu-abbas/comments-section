import { View } from './View';

class commentView extends View {
  _parentElement = document.querySelector('.main');

  renderNewComment(comment, position) {
    const form = document.querySelector('.main-form');
    const html = this._renderComment(comment);
    this._insertHTML(form, html, position);
  }

  commentListner(action) {
    const form = document.querySelector('.add-comment');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const comment = Object.fromEntries([...new FormData(this)]).comment;
      form.reset();
      action(comment);
    });
  }

  _renderMarkup() {
    return this._data.comments.map(comment => this._renderComment(comment)).join('');
  }

  _renderComment(comment) {
    return `
    <section class="comment-section" style="order:${999 - comment.score};">
    <article class="comment" data-id="${comment.id}">
        <div class="block-votes-container">
          <div class="block-votes">
            <button class="btn vote vote-up" aria-label="vote-up">
              <svg class="block-votes-icon m-grayish" width="11" height="11" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                />
              </svg>
            </button>
            <span class="block-votes-counter m-blue">${comment.score}</span>
            <button class="btn vote vote-down" aria-label="vote-down">
              <svg class="block-votes-icon m-grayish" width="11" height="3" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                />
              </svg>
            </button>
          </div>
          ${
            comment.user.username === this._data.currentUser.username
              ? `${this._userCommentBtns('mobile-version')}`
              : `${this._userBtn('mobile-version')}`
          }
        </div>
          <figure class="block-content">
            <picture class="block-content-img">
              <source srcset="${comment.user.image.webp}" />
              <img src="${comment.user.image.png}" alt="author photo" />
            </picture>

            <figcaption class="block-content-details">
              <cite class="block-content-details-author">${comment.user.username}</cite>
              ${comment.user.username === this._data.currentUser.username ? `<span class="user-flag">You</span>` : ``}
              <time class="block-content-details-time" datetime="1692522812">${this._getTime(comment.createdAt)}</time>

              ${
                comment.user.username === this._data.currentUser.username
                  ? `${this._userCommentBtns('desktop-version')}`
                  : `${this._userBtn('desktop-version')}`
              }
            </figcaption>

            <blockquote class="block-content-message" cite="${comment.user.username}">
              <span class="content">${comment.content}</span>
            </blockquote>
          </figure>
        </article>
        </section>
    `;
  }
}

export default new commentView();
