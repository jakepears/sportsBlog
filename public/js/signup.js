const signupFormHandler = async function (event) {
    event.preventDefault();
  
    const usernameEl = document.querySelector('#username-input-signup').value.trim();
    const emailEl = document.querySelector('#email-input-signup').value.trim();
    const passwordEl = document.querySelector('#password-input-signup').value.trim();
    const confirmPasswordEl = document.querySelector('#confirm-password-input-signup').value.trim();
  
    if (usernameEl && emailEl && passwordEl.length >= 8 && passwordEl === confirmPasswordEl) {
      const response = await fetch('/signup', {
        method: 'POST',
        body: JSON.stringify({
          username: usernameEl,
          email: emailEl,
          password: passwordEl,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to create new user');
      }
    } else {
      alert('Please provide a username, email, and matching passwords with at least 8 characters');
    }
  };
  
  document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);