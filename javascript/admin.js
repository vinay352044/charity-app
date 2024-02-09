if(localStorage.getItem('isAdminLoggedIn') === 'NO') {
    window.location.href = '/Charity.html'
  }
  
  document.addEventListener("DOMContentLoaded", function () {
      const ngoForm = document.getElementById("ngo-form");
      const ngoCardsContainer = document.getElementById("ngo-cards-container");
    
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
          cardDiv.appendChild(deleteButton);
    
          ngoCardsContainer.appendChild(cardDiv);
        });
      }
    
      // Render the initial cards
      renderCards();
    
      ngoForm.addEventListener("submit", function (e) {
        e.preventDefault();
    
        const ngoName = document.getElementById("ngo-name").value;
        const ngoDescription = document.getElementById("ngo-description").value;
    
        const ngoCard = {
          id: crypto.randomUUID(),
          name: ngoName,
          description: ngoDescription,
          createdBy: 'admin',
          amount: 0,
        };
    
        let ngoCards = JSON.parse(localStorage.getItem("ngoCards")) || [];
    
        ngoCards.push(ngoCard);
    
        localStorage.setItem("ngoCards", JSON.stringify(ngoCards));
    
        window.location.href = "charity.html";
      });
    });
    