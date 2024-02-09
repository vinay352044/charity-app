const myForm = document.getElementById('ngoLoginForm');

myForm.addEventListener('submit', function (event) {
  event.preventDefault()
  const userName = document.getElementById('username').value;
  const passWord = document.getElementById('password').value;

  let NGOs = JSON.parse(localStorage.getItem('NGOs'));

  NGOs = NGOs.filter((ngo) => ngo.username === userName);

  if(!NGOs || NGOs === undefined || NGOs.length === 0) {
    alert('NGO does not exists');
    return;
  }

  if(NGOs[0].password !== passWord) {
    alert('Incorrect password');
    return;
  }

  localStorage.setItem('NGO', JSON.stringify(NGOs));
  localStorage.setItem('isNGOLoggedIn', 'YES');
  localStorage.setItem('isUserLoggedIn', 'NO');
  window.location.href = '/Charity.html'
})
