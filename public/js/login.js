const loginFormHandler = async function (event) {
    event.preventDefault();
  
    const usernameOrEmailEl = document.querySelector('#username-email-input-login').value.trim();
    const passwordEl = document.querySelector('#password-input-login').value.trim();
  
    if (usernameOrEmailEl && passwordEl) {
      const response = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify({
          usernameOrEmail: usernameOrEmailEl,
          password: passwordEl,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to login');
      }
    } else {
      alert('Please provide a username or email and password');
    }
  };
  
  document.querySelector('#login-form').addEventListener('submit', loginFormHandler);