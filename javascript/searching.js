document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("serach-input")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      // calling the searchNgo function
      const query = document
        .getElementById("search-form")
        .value.trim()
        .toLowerCase();
      searchNgo(query);
    });
});

function searchNgo(query) {
  // Get all NGO cards
  const ngoCards = document.querySelectorAll(".card");
  const container = document.getElementById("ngo-cards-container"); // Main container for NGO cards
  const existingMessage = container.querySelector(".no-data-message");

  if (existingMessage) {
    container.removeChild(existingMessage);
  }

  let dataFound = false; // to track if data is found or not

  // Loop through each card and check if the name or description matches the search query
  ngoCards.forEach((card) => {
    const name = card.querySelector(".card-title").textContent.toLowerCase();
    const description = card
      .querySelector(".card-text")
      .textContent.toLowerCase();
    if (name.includes(query) || description.includes(query)) {
      card.style.display = "block";
      dataFound = true; // Set flag to true
    } else {
      card.style.display = "none"; // Hide the card if it doesn't match
    }
  });

  // Display message if no data is found
  if (!dataFound) {
    const noDataMessage = document.createElement("div");
    noDataMessage.innerText = "No data found";
    noDataMessage.classList.add("no-data-message");
    container.appendChild(noDataMessage);
  }
}
