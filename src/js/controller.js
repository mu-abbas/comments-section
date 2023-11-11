import * as model from './model';
import commentView from './view/commentView';
import commentFormView from './view/commentFormView';
import formView from './view/formView';
import replyView from './view/replyView';

async function init() {
  await model.loadingData();
  setLastId(model.state);
  commentView.render(model.state);
  commentFormView.render(model.state);
  renderReplies(model.state);
  formView.formListener(renderForm);
}

function renderForm() {
  formView.render(model.state, 'afterend');
  replyView.replyListner(saveNewReply);
}

function renderReplies(state) {
  state.comments.forEach(comment => {
    const commentEl = document.querySelector(`[data-comment-id="${comment.id}"]`).closest('.comment-section');
    replyView.render(state, comment, commentEl);
  });
}

function saveNewReply(commentId, reply, replyTo) {
  model.state.comments.forEach(comment => {
    if (comment.id === +commentId) {
      model.state.lastId++;
      comment.replies.push({
        id: model.state.lastId,
        content: reply,
        createdAt: Date.now(),
        score: 0,
        replyingTo: replyTo,
        user: model.state.currentUser,
      });
    }
  });
}
function setLastId(state) {
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

init();
