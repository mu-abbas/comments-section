import * as model from './model';
import commentView from './view/commentView';
import commentFormView from './view/commentFormView';

async function render() {
  await model.loadingData();
  commentView.render(model.state);
  commentFormView.render(model.state);
  console.log(model.state);
}

render();
