/* eslint-disable no-unused-expressions */
const loginBtn = document.querySelector('.login');

loginBtn?.addEventListener('click', async () => {
  const login = document.querySelector('.login-login').value;
  const password = document.querySelector('.login-password').value;

  if (login && password !== '') {
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        login,
        password,
      }),
    });
    const result = await response.json();
    if (result.result === 'ok') {
      window.location.replace('/');
    } else {
      // show error
      const loginContainer = document.querySelector('.login-container');
      const newDiv = document.createElement('div');
      newDiv.className = 'notification is-danger is-light';
      const div =
        'Пользователя с такими данными не существует в БД. Попробуйте ввести другие данные.';
      newDiv.innerHTML = div;
      loginContainer.append(newDiv);
      // hide error after 2 second
      setTimeout(() => {
        document.querySelector('.notification').remove();
      }, 2000);
    }
  }
});
