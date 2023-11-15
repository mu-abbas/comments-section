import * as model from './model';
import commentView from './view/commentView';
import commentFormView from './view/commentFormView';
import formView from './view/replyFormView';
import replyView from './view/replyView';

async function init() {
  await model.loadingData();
  model.setLastId();
  commentView.render(model.state);
  commentFormView.render(model.state);
  renderReplies(model.state);
  formView.formListener(renderForm);
  commentView.deleteListner(model.deleteFromState);
  commentView.commentListner(addNewComment);
  commentView.editListner(updateContentListner);
}

function updateContentListner() {
  commentView.updateListner(updateContent);
}

function updateContent(id, updateContent) {
  const parentEl = document.querySelector(`[data-id="${id}"]`);
  const parent = model.updateContentofState(id, updateContent);
  commentView.renderUpdatedContent(model.state, parent, parentEl);
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

function addNewComment(comment) {
  model.saveCommentToState(comment);
  commentView.renderNewComment(model.state.comments[model.state.comments.length - 1], 'beforeBegin');
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
