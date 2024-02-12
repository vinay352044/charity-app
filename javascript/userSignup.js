const myForm = document.getElementById("userSignupForm");

myForm.addEventListener("submit", function (event) {
  event.preventDefault();  // to prevent page from reloading after submitting the form
  const userName = document.getElementById("username").value;
  const passWord = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const alreadyExists = users.filter((user) => user.username === userName);

  if (alreadyExists.length > 0) {
    alert("User already exists");
    return;
  }

  users.push({
    username: userName,
    password: passWord,
  });

  localStorage.setItem("users", JSON.stringify(users));
  window.location.href = "/userLogin.html";
});
