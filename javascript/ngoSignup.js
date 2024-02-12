const myForm2 = document.getElementById("ngoSignupForm");

myForm2.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const userName = document.getElementById("username").value;
  const passWord = document.getElementById("password").value;

  let NGOs = JSON.parse(localStorage.getItem("NGOs")) || [];

  const alreadyExists = NGOs.filter((ngo) => ngo.username === userName);

  if (alreadyExists.length > 0) {
    alert("NGO already exists");
    return;
  }

  NGOs.push({
    username: userName,
    password: passWord,
    name: name,
    id: crypto.randomUUID(),  // to generate random id for a particular ngo
  });

  localStorage.setItem("NGOs", JSON.stringify(NGOs));
  window.location.href = "/ngoLogin.html";
});
