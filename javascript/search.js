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
    const ngoCards = document.querySelectorAll(".ngo"); //class ka name h: .ngo --> pura card including name , description , images sb dikhana h so vo har particular card ka div h usko hum store kr rhe ngoCards me

    // Loop through each card and check if the name matches the search query
    ngoCards.forEach(card => {
        const name = card.querySelector("h3").textContent.toLowerCase();
        if (name.includes(query)) {
            card.style.display = "block"; // Show the card if it matches
        } else {
            // alert('no results found for given search')
            card.style.display = "none"; // Hide the card if it doesn't match
        }
    });
}
