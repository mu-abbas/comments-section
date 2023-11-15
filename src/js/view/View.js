export class View {
  _data;
  _action;

  render(data, position) {
    if (data) this._data = data;
    const html = this._renderMarkup();
    this._insertHTML(this._parentElement, html, position);
  }

  editListner(action) {
    this._action = action;
    document.addEventListener('click', this._editForm.bind(this));
  }

  voteListner(action) {
    this._action = action;
    document.addEventListener('click', this._voting.bind(this));
  }

  // _voting(e) {
  //   const btn = e.target.closest('')
  // }

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
      ${parent.replyingTo ? `<span class="mention">@${parent.replyingTo}</span>` : ``} ${parent.content}
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
      this._action();
    }
  }

  deleteListner(action) {
    this._action = action;
    document.addEventListener('click', this._delete.bind(this));
  }

  _delete(e) {
    const deleteBtn = e.target.closest('.delete-btn');
    if (deleteBtn) {
      let element = deleteBtn.closest('.reply');
      if (!element) element = deleteBtn.closest('.comment');
      const id = element.dataset.id;
      const deleted = this._action(id);
      if (deleted === 'comment') {
        element = element.closest('.comment-section');
      }
      if (deleted === 'lastReply') {
        element = element.closest('.replies');
      }
      if (deleted) element.remove();
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
}
