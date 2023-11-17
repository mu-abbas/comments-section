export const state = {
  comments: {},
  currentUser: {},
  lastId: 0,
};

export async function loadingData() {
  let data = getFromLocalStorage('state');
  if (!data) {
    const response = await fetch(
      'https://res.cloudinary.com/dx2mn0ic0/raw/upload/v1700181705/FEM%20-%20Comment%20Section/data_jwxssf.json'
    );
    data = await response.json();
  }
  state.comments = data.comments;
  state.currentUser = data.currentUser;
}

export function saveReplyToState(id, reply, replyTo) {
  state.comments.forEach(comment => {
    if (comment.id === +id) {
      state.lastId++;
      comment.replies.push({
        id: state.lastId,
        content: reply,
        createdAt: Date.now(),
        score: 0,
        replyingTo: replyTo,
        user: state.currentUser,
      });
    }
  });
  saveToLocalStorage(state);
}

export function updateContentofState(id, updatedContent) {
  let parent;
  state.comments.forEach(comment => {
    if (comment.id === +id && comment.user.username === state.currentUser.username) {
      comment.content = updatedContent;
      parent = comment;
    } else {
      comment.replies.forEach(reply => {
        if (reply.id === +id && reply.user.username === state.currentUser.username) {
          reply.content = updatedContent;
          parent = reply;
        }
      });
    }
  });
  saveToLocalStorage(state);
  return parent;
}

export function saveCommentToState(comment) {
  state.lastId++;
  state.comments.push({
    id: state.lastId,
    content: comment,
    createdAt: Date.now(),
    score: 0,
    user: state.currentUser,
    replies: [],
  });
  saveToLocalStorage(state);
}

export function updateVote(id, status) {
  let parent;
  state.comments.forEach(comment => {
    if (comment.id === +id) {
      status === 'up' ? comment.score++ : comment.score--;
      parent = comment;
    } else {
      comment.replies.forEach(reply => {
        if (reply.id === +id) {
          status === 'up' ? reply.score++ : reply.score--;
          parent = reply;
        }
      });
    }
  });
  if (parent.score < 0) parent.score = 0;
  if (parent.score > 999) parent.score = 999;
  saveToLocalStorage(state);
  return parent;
}

export function deleteFromState(id) {
  let index;
  let deleted = false;
  state.comments.forEach(comment => {
    if (comment.id === +id && comment.user.username === state.currentUser.username) {
      index = state.comments.indexOf(comment);
      state.comments.splice(index, 1);
      deleted = 'comment';
    } else {
      comment.replies.forEach(reply => {
        if (reply.id === +id && reply.user.username === state.currentUser.username) {
          index = comment.replies.indexOf(reply);
          comment.replies.splice(index, 1);
          comment.replies.length > 0 ? (deleted = 'reply') : (deleted = 'lastReply');
        }
      });
    }
  });
  saveToLocalStorage(state);
  return deleted;
}

export function setLastId() {
  let lastId = 0;
  state.comments.forEach(comment => {
    if (comment.id > lastId) {
      lastId = comment.id;
      comment.replies.forEach(reply => {
        if (reply.id > lastId) lastId = reply.id;
      });
    }
  });
  state.lastId = lastId;
}

function saveToLocalStorage(state) {
  localStorage.setItem('state', JSON.stringify(state));
}

function getFromLocalStorage(state) {
  return JSON.parse(localStorage.getItem(state));
}
