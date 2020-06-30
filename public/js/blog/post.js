/* eslint-disable no-unused-expressions */

// Добавление постов
const postAdd = document.querySelector('.add-post');
postAdd?.addEventListener('click', async (event) => {
  if (event.target.classList.contains('add-post-btn')) {
    const category = document.querySelector('select').value;
    const title = document.querySelector('.add-title').value;
    const body = document.querySelector('.add-text').value;
    const response = await fetch('/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category, title, body }),
    });
    const result = await response.json();
    console.log(result);
    if (result.result === 'ok') {
      window.location.reload();
    }
  }
});
