export class View {
  _data;
  _action;

  render(data, position) {
    if (data) this._data = data;
    const html = this._renderMarkup();
    this._insertHTML(this._parentElement, html, position);
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
