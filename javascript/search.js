document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("search-input").addEventListener("submit", function(event) {
        event.preventDefault(); //(page refresh)

        // calling the searchNgo function
        const query=document.getElementById("search-form").value.trim().toLowerCase()
        searchNgo(query);
    });
});

function searchNgo(query) {
    // Get all NGO cards
    const ngoCards = document.querySelectorAll(".ngo");
    const container = document.getElementById("ngoContainer"); //this is the main container in which we are showing all the cards dynamically , after searchng , only matched card will be shown here
    const existingMessage = container.querySelector(".no-data-message");
    if (existingMessage) {
        container.removeChild(existingMessage);
    }

    let dataFound = false; // to track if data is found or nott

    // Loop through each card and check if the name matches the search query
    ngoCards.forEach(card => {
        const name = card.querySelector("h3").textContent.toLowerCase();
        if (name.includes(query)) {
            card.style.display = "block"; 
            dataFound = true; // Set flag to true
        } else {
            card.style.display = "none"; // Hide the card if it doesn't match
        }
    });

    //display message if no data is found
    if (!dataFound) {
        const noDataMessage = document.createElement('h3');
        noDataMessage.innerText = 'No data found';
        noDataMessage.classList.add('no-data-message'); 
        container.appendChild(noDataMessage); 
    }
}
