const myForm = document.getElementById('userLoginForm');

myForm.addEventListener('submit', function (event) {
  event.preventDefault()
  const userName = document.getElementById('username').value;
  const passWord = document.getElementById('password').value;

  let users = JSON.parse(localStorage.getItem('users')) || [];

  const alreadyExists = users.filter((user) => user.username === userName);

  if(alreadyExists.length > 0) {
    alert('User already exists');
    return;
  }

  users.push({
    username: userName,
    password: passWord
  })

  localStorage.setItem('users', JSON.stringify(users));
  window.location.href = '/userLogin.html'
})

