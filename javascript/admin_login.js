localStorage.setItem("pass", "abc");
localStorage.setItem("uname", "admin");

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("admin-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const admin_uname = document.getElementById("admin-uname").value;
    const password = document.getElementById("admin-pass").value;

    const localuname = localStorage.getItem("uname");
    const localpass = localStorage.getItem("pass");
    console.log(localpass);
    console.log(localuname);
    if (admin_uname === localuname && password === localpass) {
      localStorage.setItem("isAdminLoggedIn", "YES");
      window.location.href = "admin.html";
    } else {
      alert("admin doesnot exists");
      window.location.href = "Charity.html";
    }
  });
});
