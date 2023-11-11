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
  commentView.deleteListner(model.deleteFromState);
}

function renderForm() {
  formView.render(model.state, 'afterend');
  replyView.replyListner(addNewReply);
}

function renderReplies(state) {
  state.comments.forEach(comment => {
    const commentEl = document.querySelector(`[data-id="${comment.id}"]`).closest('.comment-section');
    replyView.render(state, comment, commentEl);
  });
}

function addNewReply(id, reply, replyTo) {
  model.saveReplyToState(id, reply, replyTo);
  renderReplyToView(id);
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

function renderReplyToView(id) {
  model.state.comments.forEach(comment => {
    if (comment.id === +id) {
      const parent = document.querySelector(`[data-id="${comment.id}"]`).closest('.comment-section');
      if (comment.replies.length === 1) {
        replyView.render(model.state, comment, parent);
      } else replyView.update(model.state, comment, parent);
    }
  });
}

init();
