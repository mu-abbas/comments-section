export const state = {
  comments: {},
  currentUser: {},
  lastId: 0,
};

export async function loadingData() {
  const response = await fetch('./data.json');
  const data = await response.json();
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
