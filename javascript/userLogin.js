const myForm = document.getElementById("userLoginForm");

myForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const userName = document.getElementById("username").value;
  const passWord = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("users"));

  users = users.filter((user) => user.username === userName);

  if (!users || users === undefined || users.length === 0) {
    alert("User does not exists");
    return;
  }

  if (users[0].password !== passWord) {
    alert("Incorrect password");
    return;
  }

  localStorage.setItem("isUserLoggedIn", "YES");
  localStorage.setItem("isNGOLoggedIn", "NO");
  window.location.href = "/Charity.html";
});
