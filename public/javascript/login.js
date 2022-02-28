async function signupFormHandler(event) {
    event.preventDefault();
  
    const username = document.getElementById('u-name-su').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password-su').value.trim();
  
    if (username && email && password) {
      const response = await fetch('/api/users', {
        method: 'post',
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

document.getElementById('sign-up').addEventListener('submit', signupFormHandler);