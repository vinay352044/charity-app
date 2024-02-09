let cost = 2200;
const parent = document.getElementById('amount');
const amount = document.createElement('span');
amount.innerText = cost.toString(); // Assuming cost is a number
parent.appendChild(amount);







const logoutBtn=document.getElementById('logout-button');
logoutBtn.addEventListener('click',()=>{
    localStorage.clear();
    window.location.href='signup.html'
})
