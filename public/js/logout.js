
    console.log("logout route")
    const logout = async () => {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  };
  


  document.querySelector('#logout').addEventListener('click', (event) => {
    event.preventDefault();
    logout();
  });
