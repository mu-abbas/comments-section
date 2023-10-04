export const state = {
  comments: {},
  currentUser: {},
};

export async function loadingData() {
  const response = await fetch('./data.json');
  const data = await response.json();
  state.comments = data.comments;
  state.currentUser = data.currentUser;
}
