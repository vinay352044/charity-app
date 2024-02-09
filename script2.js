document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('login-form');
    
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      const localEmail=localStorage.getItem(['email'])
      const localPassword=localStorage.getItem(['password']);

      if(email===localEmail && password==localPassword) {
        window.location.href='main.html'
      }
      else{
            alert('user doesnot exists');
            window.location.href='signup.html'
      } 

      
      
    });
  });
  