if(localStorage.getItem('isAdminLoggedIn') === 'NO') {
    window.location.href = '/Charity.html'
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

            const cardImage = document.createElement('img');
            cardImage.src = ngoCard.imageUrl;
            cardImage.alt = "NGO Image";

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

    // Function to render NGOs
    function renderNGOs() {
        ngoContainer.innerHTML = ""; // Clear previous NGO cards

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
                // Prompt the admin for updated information
                const updatedName = prompt("Enter updated name:", ngo.name);
                const updatedUsername = prompt("Enter updated username:", ngo.username);
                const updatedPassword = prompt("Enter updated password:", ngo.password);

                // Update the NGO with new information
                ngo.name = updatedName;
                ngo.username = updatedUsername;
                ngo.password = updatedPassword;
                // Update localStorage
                localStorage.setItem("NGOs", JSON.stringify(NGOs));

                // Re-render the NGOs
                renderNGOs();
            });

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", function () {
                // Remove the NGO from the array
                NGOs.splice(index, 1);
                // Remove associated ngoCards
                let ngoCards = JSON.parse(localStorage.getItem("ngoCards")) || [];
                ngoCards = ngoCards.filter(card => card.createdBy !== ngo.id);
                localStorage.setItem("ngoCards", JSON.stringify(ngoCards));
                // Update localStorage
                localStorage.setItem("NGOs", JSON.stringify(NGOs));
                // Re-render the NGOs
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

    // Render the initial cards, users, and NGOs
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

        if (alreadyExists.length > 0) {
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

    ngoAddForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const ngoName = document.getElementById('ngo-name').value;
        const ngoUsername = document.getElementById('ngo-username').value;
        const ngoPassword = document.getElementById('ngo-password').value;

        let NGOs = JSON.parse(localStorage.getItem('NGOs')) || [];

        const alreadyExists = NGOs.filter((ngo) => ngo.username === ngoUsername);

        if (alreadyExists.length > 0) {
            alert('NGO already exists');
            return;
        }

        const newNGO = {
            id: crypto.randomUUID(),
            name: ngoName,
            username: ngoUsername,
            password: ngoPassword
        };

        NGOs.push(newNGO);
        localStorage.setItem('NGOs', JSON.stringify(NGOs));
        renderNGOs(); // Re-render NGOs after adding a new NGO
    });
});
