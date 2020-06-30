/* eslint-disable no-unused-expressions */

// Добавление категорий
const catEditForm = document.querySelector('.category-edit');
catEditForm?.addEventListener('click', async (event) => {
  if (event.target.classList.contains('cat-add')) {
    const name = document.querySelector('.input').value;
    const response = await fetch('/category', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    const result = await response.json();
    console.log(result);
    if (result.result === 'ok') {
      window.location.reload();
    }
  }
});
