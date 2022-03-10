// allow user to sign up
async function signupFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('input[name="sign-up-name"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim();
    const password = document.querySelector('input[name="sign-up-password"]').value.trim();
  
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
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
}
  
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);