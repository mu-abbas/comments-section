import { View } from './View';

class replyView extends View {
  render(data, comment) {
    return comment.replies.length > 0
      ? `
    <section class="replies">
        ${comment.replies.map(reply => this._renderReply(data, reply)).join('')}
    </section>
    `
      : '';
  }

  _renderReply(data, reply) {
    return `
    <article class="reply" data-replyId="${reply.id}">
          <div class="block-votes">
            <button class="btn" aria-label="vote-up">
              <svg class="block-votes-icon m-grayish" width="11" height="11" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                />
              </svg>
            </button>
            <span class="block-votes-counter m-blue">${reply.score}</span>
            <button class="btn" aria-label="vote-down">
              <svg class="block-votes-icon m-grayish" width="11" height="3" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                />
              </svg>
            </button>
          </div>

          <figure class="block-content">
            <picture class="block-content-img">
              <source srcset="${reply.user.image.webp}" />
              <img src="${reply.user.image.png}" alt="author photo" />
            </picture>

            <figcaption class="block-content-details">
              <cite class="block-content-details-author">${reply.user.username}</cite>
              <time class="block-content-details-time" datetime="1692522812">${reply.createdAt}</time>

              ${
                reply.user.username === data.currentUser.username
                  ? `<button class="btn action-btn mg-left-auto">
              <svg class="action-btn-icon m-red" width="12" height="14" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                />
              </svg>
              <span class="action-btn-description m-red">delete</span>
            </button>`
                  : ``
              }

              <button class="btn action-btn ${reply.user.username === data.currentUser.username ? '' : 'mg-left-auto'}">
                <svg class="action-btn-icon m-blue" width="14" height="13" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                  />
                </svg>
                <span class="action-btn-description m-blue">reply</span>
              </button>
            </figcaption>

            <blockquote class="block-content-message" cite="${reply.user.username}">
              <span class="mention">@${reply.replyingTo}</span>
              ${reply.content}
            </blockquote>
          </figure>
        </article>
    `;
  }
}

export default new replyView();
