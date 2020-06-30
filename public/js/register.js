/* eslint-disable no-unused-expressions */
const registerBtn = document.querySelector('.register-btn');
registerBtn?.addEventListener('click', async () => {
  const login = document.querySelector('.register-login').value;
  const password = document.querySelector('.register-password').value;
  const email = document.querySelector('.register-email').value;

  if (login && password && email !== '') {
    const response = await fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, password, email }),
    });
    const result = await response.json();
    if (result.result === 'ok') {
      // redirect to main
      window.location.replace('/');
    } else {
      // show error
      const loginContainer = document.querySelector('.register-container');
      const newDiv = document.createElement('div');
      newDiv.className = 'notification is-danger is-light';
      const div =
        'Пользователь с такими Email уже существует в БД. Попробуйте ввести другие данные';
      newDiv.innerHTML = div;
      loginContainer.append(newDiv);
      // hide error after 2 second
      setTimeout(() => {
        document.querySelector('.notification').remove();
      }, 2000);
    }
  }
});
