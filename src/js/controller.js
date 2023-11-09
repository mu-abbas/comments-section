import * as model from './model';
import commentView from './view/commentView';
import commentFormView from './view/commentFormView';
import formView from './view/formView';

async function render() {
  await model.loadingData();
  commentView.render(model.state);
  commentFormView.render(model.state);
}

render();
formView.formListener(toggleForm);

function toggleForm() {
  const current = document.querySelector('.add-reply');
  if (current) {
    current.remove();
  } else {
    formView.render(model.state, 'afterend');
  }
}
