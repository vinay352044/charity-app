if(localStorage.getItem('isAdminLoggedIn') === 'NO') {
    window.location.href = '/Charity.html'
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    const ngoForm = document.getElementById("ngo-form");
    const ngoCardsContainer = document.getElementById("ngo-cards-container");
    const userForm = document.getElementById("user-form");
    const userContainer = document.getElementById("user-container");
  
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
  
            const cardImage = document.createElement('img');
            cardImage.src = ngoCard.imageUrl
            cardImage.alt = "NGO Image"
  
            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.addEventListener("click", function () {
                // Prompt the admin for updated information
                const updatedName = prompt("Enter updated name:", ngoCard.name);
                const updatedDescription = prompt("Enter updated description:", ngoCard.description);
  
                const updatedImageUrl = prompt("Enter updated image URL:", ngoCard.imageUrl);
  
                // Update the card with new information
                ngoCard.name = updatedName;
                ngoCard.description = updatedDescription;
                ngoCard.imageUrl = updatedImageUrl;
                // Update localStorage
                localStorage.setItem("ngoCards", JSON.stringify(ngoCards));
  
                // Re-render the cards
                renderCards();
            });
  
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", function () {
                // Remove the card from the array
                ngoCards.splice(index, 1);
                // Update localStorage
                localStorage.setItem("ngoCards", JSON.stringify(ngoCards));
                // Re-render the cards
                renderCards();
            });
  
            cardDiv.appendChild(cardTitle);
            cardDiv.appendChild(cardDescription);
            cardDiv.appendChild(cardImage)
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
              // Prompt the admin for updated information
              const updatedUsername = prompt("Enter updated username:", user.username);
              const updatedPassword = prompt("Enter updated password:", user.password);
  
              // Update the user with new information
              user.username = updatedUsername;
              user.password = updatedPassword;
              // Update localStorage
              localStorage.setItem("users", JSON.stringify(users));
  
              // Re-render the users
              renderUsers();
          });
  
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.addEventListener("click", function () {
              // Remove the user from the array
              users.splice(index, 1);
              // Update localStorage
              localStorage.setItem("users", JSON.stringify(users));
              // Re-render the users
              renderUsers();
          });
  
          userDiv.appendChild(usernameText);
          userDiv.appendChild(passwordText);
          userDiv.appendChild(editButton);
          userDiv.appendChild(deleteButton);
  
          userContainer.appendChild(userDiv);
      });
    }
  
    // Render the initial cards and users
    renderCards();
    renderUsers();
  
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
            createdBy: 'admin',
            amount: 0,
        };
  
        let ngoCards = JSON.parse(localStorage.getItem("ngoCards")) || [];
  
        ngoCards.push(ngoCard);
  
        localStorage.setItem("ngoCards", JSON.stringify(ngoCards));
  
        window.location.href = "charity.html";
    });
  
    userForm.addEventListener('submit', function (event) {
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
      renderUsers(); // Re-render users after adding a new user
    });
  });
  