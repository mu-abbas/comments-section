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

export function deleteFromState(id) {
  let index;
  let deleted = false;
  state.comments.forEach(comment => {
    if (comment.id === +id && comment.user.username === state.currentUser.username) {
      index = state.comments.indexOf(comment);
      state.comments = state.comments.splice(index, 1);
      deleted = true;
    } else {
      comment.replies.forEach(reply => {
        if (reply.id === +id && reply.user.username === state.currentUser.username) {
          index = comment.replies.indexOf(reply);
          comment.replies = comment.replies.splice(index, 1);
          deleted = true;
        }
      });
    }
  });
  return deleted;
}
