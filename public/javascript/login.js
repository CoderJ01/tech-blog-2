async function loginFormHandler(event) {
  event.preventDefault();

  const username = document.getElementById('u-name').value.trim();
  const password = document.getElementById('password').value.trim();

  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      console.log('response.ok');
      document.location.replace('/');
    } 
    else {
      alert(response.statusText);
    }
  }
}

document.getElementById('login').addEventListener('click', loginFormHandler);