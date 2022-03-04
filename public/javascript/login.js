async function signupFormHandler(event) {
    event.preventDefault();
  
    const username = document.getElementById('u-name-su').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password-su').value.trim();
  
    if (username && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
          username,
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      // check the response status
      if (response.ok) {
        console.log('success');
      } else {
        alert(response.statusText);
      }
    }
}

async function loginFormHandler(event) {
  event.preventDefault();

  console.log("login form handler");

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

// document.getElementById('sign-up').addEventListener('click', signupFormHandler);
document.getElementById('login').addEventListener('click', loginFormHandler);