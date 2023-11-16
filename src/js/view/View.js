export class View {
  _data;
  _form;
  _vote;
  _delete;
  _update;

  render(data, position) {
    if (data) this._data = data;
    const html = this._renderMarkup();
    this._insertHTML(this._parentElement, html, position);
  }

  deleteListner(action) {
    this._delete = action;
    document.addEventListener('click', this._deleteContent.bind(this));
  }

  editListner(action) {
    this._update = action;
    document.addEventListener('click', this._editForm.bind(this));
  }

  voteListner(action) {
    this._vote = action;
    document.addEventListener('click', this._voting.bind(this));
  }

  renderNewVote(data) {
    const parentEl = document.querySelector(`[data-id="${data.id}"]`);
    const votes = data.score;
    parentEl.querySelector('.block-votes-counter').innerText = votes;
    if (parentEl.classList.contains('comment')) {
      parentEl.closest('.comment-section').style.order = 999 - votes;
    }
  }

  _voting(e) {
    const btn = e.target.closest('.vote');
    let id, status;
    if (btn) {
      id = btn.closest('.reply')?.dataset.id;
      if (!id) id = btn.closest('.comment')?.dataset.id;
      if (btn.classList.contains('vote-up')) {
        status = 'up';
      } else {
        status = 'down';
      }
      this._vote(id, status);
    }
  }

  updateListner(action) {
    const form = document.querySelector('.update-content');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const updatedContent = Object.fromEntries([...new FormData(form)]).content;
      let parent = form.closest('.reply');
      if (!parent) parent = form.closest('.comment');
      const id = parent.dataset.id;
      form.remove();
      action(id, updatedContent);
    });
  }

  renderUpdatedContent(data, parent, parentEl) {
    const html = `
    <blockquote class="block-content-message" cite="${data.currentUser.userName}">
      ${parent.replyingTo ? `<span class="mention">@${parent.replyingTo}</span>` : ``} <span class="content">${
      parent.content
    }</span>
    </blockquote>
    `;
    this._insertHTML(parentEl.querySelector('figure'), html);
  }

  _editForm(e) {
    const editBtn = e.target.closest('.edit-btn');
    if (editBtn) {
      let parent = editBtn.closest('.reply');
      if (!parent) parent = editBtn.closest('.comment');
      const messageElement = parent.querySelector('.block-content-message');
      const messageText = messageElement.querySelector('.content').innerText;
      messageElement.remove();
      const html = `
      <form class="update-content" action="#">
        <textarea name="content" required placeholder="Update the content..." class="update-content-text">${messageText}</textarea>
        <button class="btn update-content-btn">Update</button>
      </form>
      `;
      this._insertHTML(parent.querySelector('figure'), html);
      this._update();
    }
  }

  _deleteContent(e) {
    const deleteBtn = e.target.closest('.delete-btn');
    if (deleteBtn) {
      let element = deleteBtn.closest('.reply');
      if (!element) element = deleteBtn.closest('.comment');
      const gaurdHTML = `
      <div class="delete-guard-class">
      <div class="message-block">
        <h3>Delete comment</h3>
        <p>Are you sure you want to delete this comment? This will remove the comment and can’t be undone.</p>
        <div class="delete-btns">
          <button class="btn delete-status reject-delete">NO, CANCEL</button>
          <button class="btn delete-status approve-delete">YES, DELETE</button>
        </div>
      </div>
    </div>
      `;
      this._insertHTML(document.querySelector('main'), gaurdHTML);
      document.addEventListener('click', deleteStatus.bind(this));

      function deleteStatus(e) {
        const btn = e.target.closest('.delete-status');
        if (btn?.classList.contains('approve-delete')) {
          const id = element.dataset.id;
          const deleted = this._delete(id);
          if (deleted === 'comment') {
            element = element.closest('.comment-section');
          }
          if (deleted === 'lastReply') {
            element = element.closest('.replies');
          }
          if (deleted) element.remove();
        }
        if (btn) {
          btn.closest('.message-block').style.animationName = 'reverseAnimate';
          btn.closest('.delete-guard-class').style.animationName = 'decreaseOpacity';
          setTimeout(function () {
            btn.closest('.delete-guard-class').remove();
          }, 500);
        }
      }
    }
  }

  _insertHTML(parent, html, position = 'beforeend') {
    parent.insertAdjacentHTML(position, html);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  _getTime(timeStamp) {
    let time;
    const millisecondsDifference = Math.abs(Date.now() - timeStamp);
    const mins = Math.floor(millisecondsDifference / (1000 * 60));
    switch (true) {
      case mins < 1:
        time = 'Just now';
        break;
      case mins < 5:
        time = 'Few minutes ago';
        break;
      case mins < 60:
        time = `${mins} minutes ago`;
        break;
      case mins < 60 * 2:
        time = `1 hour ago`;
        break;
      case mins < 60 * 24:
        time = `${Math.floor(mins / 60)} hours ago`;
        break;
      case mins < 60 * 24 * 2:
        time = `1 day ago`;
        break;
      case mins < 60 * 24 * 7:
        time = `${Math.floor(mins / 60 / 24)} days ago`;
        break;
      case mins < 60 * 24 * 8:
        time = `1 week ago`;
        break;
      case mins < 60 * 24 * 30:
        time = `${Math.floor(mins / 60 / 24 / 7)} week ago`;
        break;
      case mins < 60 * 24 * 60:
        time = `1 month ago`;
        break;
      case mins < 60 * 24 * 30 * 12:
        time = `${Math.floor(mins / 60 / 24 / 30)} months ago`;
        break;
      case mins < 60 * 24 * 30 * 12 * 2:
        time = `1 year ago`;
        break;
      case mins < Infinity:
        time = `${Math.floor(mins / 60 / 24 / 30 / 12)} years ago`;
        break;
    }
    return time;
  }

  _userCommentBtns(version) {
    return `
          <button class="btn delete-btn action-btn mg-left-auto ${version}">
              <svg class="action-btn-icon m-red" width="12" height="14" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                />
              </svg>
              <span class="action-btn-description m-red">delete</span>
          </button>
          <button class="btn edit-btn action-btn ${version}">
                  <svg class="action-btn-icon m-blue" width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                    />
                  </svg>
                  <span class="action-btn-description m-blue">edit</span>
          </button>
    `;
  }

  _userBtn(version) {
    return `
    <button class="btn reply-btn action-btn mg-left-auto ${version}">
    <svg class="action-btn-icon m-blue" width="14" height="13" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
      />
    </svg>
    <span class="action-btn-description m-blue">reply</span>
  </button>
    `;
  }
}
