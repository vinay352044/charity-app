document.addEventListener("DOMContentLoaded", function () {
  let ngoCards = JSON.parse(localStorage.getItem("ngoCards")) || [];
  const ngoCardsContainer = document.getElementById("ngo-cards-container");
  const sortingOptions = document.getElementById("sorting");

  function sortAndDisplayCards(order) {
    ngoCardsContainer.innerHTML = "";
    if (order === "asc") {
      ngoCards.sort((a, b) => a.amount - b.amount);
    } else if (order === "desc") {
      ngoCards.sort((a, b) => b.amount - a.amount);
    }

    // Pagination logic starts here
    const container = ngoCardsContainer;
    let currentPage = 1;
    const cardsPerPage = 6;

    function renderCards(startIndex, endIndex) {
      container.innerHTML = "";
      const currentData = ngoCards.slice(startIndex, endIndex);
      currentData.forEach((ngoCard) => {
        // Rendering logic remains the same
        // Replace ngoCard with ngo if there's any conflict with variable names
        const cardColumn = document.createElement("div");
        // Remaining rendering logic goes here...
      });
    }

    function loadMore() {
      const startIndex = (currentPage - 1) * cardsPerPage;
      const endIndex = currentPage * cardsPerPage;

      renderCards(startIndex, endIndex);
      currentPage++;

      if ((currentPage - 1) * cardsPerPage >= ngoCards.length) {
        loadMoreButton.style.display = "none";
      }
    }

    renderCards(0, cardsPerPage); // Initial rendering
    // Pagination logic ends here

    sortingOptions.addEventListener("change", function () {
      const selectedOrder = sortingOptions.value;
      sortAndDisplayCards(selectedOrder);
    });
  }

  sortAndDisplayCards("asc"); // initially displaying cards in ascending order

  // Handling user login/logout visibility
  const userLogin = document.getElementById("userLogin");
  const userSignup = document.getElementById("userSignup");
  const userLogout = document.getElementById("userLogout");
  const ngoLoginBtn = document.getElementById("ngoLoginBtn");
  const ngoSignupBtn = document.getElementById("ngoSignupBtn");
  const ngoLogoutBtn = document.getElementById("ngoLogout");
  const adminLoginBtn = document.getElementById("adminLoginBtn");
  const adminPageBtn = document.getElementById("adminPageBtn");
  const ngoPageBtn = document.getElementById("ngoPageBtn");

  // User authentication logic remains the same...

  userLogout.addEventListener("click", function () {
    localStorage.setItem("isUserLoggedIn", "NO");
    localStorage.setItem("isAdminLoggedIn", "NO");
    window.location.reload();
  });

  ngoLogoutBtn.addEventListener("click", function () {
    localStorage.setItem("isNGOLoggedIn", "NO");
    localStorage.setItem("isAdminLoggedIn", "NO");
    window.location.reload();
  });

  // Pagination related logic

  const paginationContainer = document.getElementById("paginationContainer");
  const loadMoreButton = document.getElementById("loadMoreButton");

  let currentPage = 1;
  const cardsPerPage = 6;
  let data = [];

  function renderCards(startIndex, endIndex) {
    const currentData = data.slice(startIndex, endIndex);
    currentData.forEach((ngo) => {
      const ngoDiv = document.createElement("div");
      ngoDiv.classList.add("ngo");

      const imageUrl = ngo.image_url || "https://via.placeholder.com/400x300";

      ngoDiv.innerHTML = `
                <img src="${imageUrl}" alt="${ngo.name}">
                <h3>${ngo.name}</h3>
                <p>${ngo.description}</p>
                <p>Available balance: $ ${ngo.available_balance}</p>
            `;

      const donateButton = document.createElement("button");
      donateButton.textContent = "Donate Now";
      donateButton.classList.add("donate");
      donateButton.style.backgroundColor = "#4CAF50";
      donateButton.style.color = "white";
      donateButton.style.padding = "10px 20px";
      donateButton.style.fontSize = "16px";
      donateButton.style.border = "none";
      donateButton.style.borderRadius = "5px";

      // donateButton.addEventListener('click', () => {
      //     if (!isLoggedIn) {
      //         alert('Please login first to donate.');
      //     } else {
      //         window.location.href = 'donationPage.html';
      //     }
      // });

      ngoDiv.appendChild(donateButton);
      container.appendChild(ngoDiv);
    });
  }

  function loadMore() {
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = currentPage * cardsPerPage;

    renderCards(startIndex, endIndex);
    currentPage++;

    if ((currentPage - 1) * cardsPerPage >= data.length) {
      loadMoreButton.style.display = "none";
    }
  }

  fetch("ngo_data.json")
    .then((response) => response.json())
    .then((jsonData) => {
      data = jsonData;

      // Initially load first page of cards
      loadMore();

      if (currentPage * cardsPerPage < data.length) {
        loadMoreButton.style.display = "block";
      }

      loadMoreButton.addEventListener("click", loadMore);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});
