if (localStorage.getItem("isAdminLoggedIn") === "NO") {
  window.location.href = "/Charity.html";
}

document.addEventListener("DOMContentLoaded", function () {
  const ngoForm = document.getElementById("ngo-form");
  const ngoCardsContainer = document.getElementById("ngo-cards-container");
  const userForm = document.getElementById("user-form");
  const userContainer = document.getElementById("user-container");
  const ngoAddForm = document.getElementById("ngo-add-form");
  const ngoContainer = document.getElementById("ngo-container");

  // Function to render the NGO cards
  function renderCards() {
    ngoCardsContainer.innerHTML = ""; // Clear previous cards

    let ngoCards = JSON.parse(localStorage.getItem("ngoCards")) || [];

    ngoCards.forEach(function (ngoCard, index) {
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card");
      cardDiv.style.width = "300px";
      cardDiv.style.margin = "10px";

      const cardTitle = document.createElement("h2");
      cardTitle.textContent = ngoCard.name;

      const cardDescription = document.createElement("p");
      cardDescription.textContent = ngoCard.description;

      const cardImage = document.createElement("img");
      cardImage.src = ngoCard.imageUrl;
      cardImage.alt = "NGO Image";

      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.addEventListener("click", function () {
        // prompting the admin to update the information
        const updatedName = prompt("Enter updated name:", ngoCard.name);
        const updatedDescription = prompt(
          "Enter updated description:",
          ngoCard.description
        );

        const updatedImageUrl = prompt(
          "Enter updated image URL:",
          ngoCard.imageUrl
        );

        // update the card with new information or keep it as it is if no change is there to edit in the card
        ngoCard.name = updatedName;
        ngoCard.description = updatedDescription;
        ngoCard.imageUrl = updatedImageUrl;
        // Update localStorage
        localStorage.setItem("ngoCards", JSON.stringify(ngoCards));

        // here we are calling  the render card function to display the cards with edited values
        renderCards();
      });

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", function () {
        // if click then remove the card from the array , splice edits the existing array and doesnot create new
        ngoCards.splice(index, 1); // from that particular index remove 1 item
        // Update localStorage
        localStorage.setItem("ngoCards", JSON.stringify(ngoCards));
        // render the cards back with updated value from the local storage
        renderCards();
      });

      cardDiv.appendChild(cardTitle);
      cardDiv.appendChild(cardDescription);
      cardDiv.appendChild(cardImage);
      cardDiv.appendChild(editButton);
      cardDiv.appendChild(deleteButton);

      ngoCardsContainer.appendChild(cardDiv);
    });
  }

  // Function to render users
  function renderUsers() {
    userContainer.innerHTML = ""; // Clear previous user cards

    let users = JSON.parse(localStorage.getItem("users")) || [];

    users.forEach(function (user, index) {
      const userDiv = document.createElement("div");
      userDiv.classList.add("user-card");
      userDiv.style.width = "300px";
      userDiv.style.margin = "10px";

      const usernameText = document.createElement("p");
      usernameText.textContent = "Username: " + user.username;

      const passwordText = document.createElement("p");
      passwordText.textContent = "Password: " + user.password;

      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.addEventListener("click", function () {
        const updatedUsername = prompt(
          "Enter updated username:",
          user.username
        );
        const updatedPassword = prompt(
          "Enter updated password:",
          user.password
        );

        user.username = updatedUsername;
        user.password = updatedPassword;
        localStorage.setItem("users", JSON.stringify(users));

        renderUsers();
      });

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", function () {
        users.splice(index, 1);
        localStorage.setItem("users", JSON.stringify(users));
        renderUsers();
      });

      userDiv.appendChild(usernameText);
      userDiv.appendChild(passwordText);
      userDiv.appendChild(editButton);
      userDiv.appendChild(deleteButton);

      userContainer.appendChild(userDiv);
    });
  }

  // for ngos
  function renderNGOs() {
    ngoContainer.innerHTML = ""; // clearing previous ngo cards

    let NGOs = JSON.parse(localStorage.getItem("NGOs")) || [];

    NGOs.forEach(function (ngo, index) {
      const ngoDiv = document.createElement("div");
      ngoDiv.classList.add("ngo-card");
      ngoDiv.style.width = "300px";
      ngoDiv.style.margin = "10px";

      const ngoNameText = document.createElement("p");
      ngoNameText.textContent = "NGO Name: " + ngo.name;

      const ngoUsernameText = document.createElement("p");
      ngoUsernameText.textContent = "Username: " + ngo.username;

      const ngoPasswordText = document.createElement("p");
      ngoPasswordText.textContent = "Password: " + ngo.password;

      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.addEventListener("click", function () {
        const updatedName = prompt("Enter updated name:", ngo.name);
        const updatedUsername = prompt("Enter updated username:", ngo.username);
        const updatedPassword = prompt("Enter updated password:", ngo.password);

        ngo.name = updatedName;
        ngo.username = updatedUsername;
        ngo.password = updatedPassword;

        localStorage.setItem("NGOs", JSON.stringify(NGOs));

        renderNGOs();
      });

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", function () {
        NGOs.splice(index, 1);
        let ngoCards = JSON.parse(localStorage.getItem("ngoCards")) || [];
        ngoCards = ngoCards.filter((card) => card.createdBy !== ngo.id);
        localStorage.setItem("ngoCards", JSON.stringify(ngoCards));
        localStorage.setItem("NGOs", JSON.stringify(NGOs));
        renderNGOs();
      });

      ngoDiv.appendChild(ngoNameText);
      ngoDiv.appendChild(ngoUsernameText);
      ngoDiv.appendChild(ngoPasswordText);
      ngoDiv.appendChild(editButton);
      ngoDiv.appendChild(deleteButton);

      ngoContainer.appendChild(ngoDiv);
    });
  }

  // doing intial redering of ngoCards , users and ngos by calling render function
  renderCards();
  renderUsers();
  renderNGOs();

  ngoForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const ngoName = document.getElementById("ngo-name").value;
    const ngoDescription = document.getElementById("ngo-description").value;
    const ngoImageUrl = document.getElementById("ngo-image-url").value;

    const ngoCard = {
      id: crypto.randomUUID(),
      name: ngoName,
      description: ngoDescription,
      imageUrl: ngoImageUrl,
      createdBy: "admin",
      amount: 0,
    };

    let ngoCards = JSON.parse(localStorage.getItem("ngoCards")) || [];

    ngoCards.push(ngoCard);

    localStorage.setItem("ngoCards", JSON.stringify(ngoCards));

    window.location.href = "charity.html";
  });

  userForm.addEventListener("submit", function (event) {
    event.preventDefault();
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
    renderUsers(); // Re-render users after adding a new user
  });

  ngoAddForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const ngoName = document.getElementById("ngo-name").value;
    const ngoUsername = document.getElementById("ngo-username").value;
    const ngoPassword = document.getElementById("ngo-password").value;

    let NGOs = JSON.parse(localStorage.getItem("NGOs")) || [];

    const alreadyExists = NGOs.filter((ngo) => ngo.username === ngoUsername);

    if (alreadyExists.length > 0) {
      alert("NGO already exists");
      return;
    }

    const newNGO = {
      id: crypto.randomUUID(),
      name: ngoName,
      username: ngoUsername,
      password: ngoPassword,
    };

    NGOs.push(newNGO);
    localStorage.setItem("NGOs", JSON.stringify(NGOs));
    renderNGOs(); // Re-render NGOs after adding a new NGO
  });
});
