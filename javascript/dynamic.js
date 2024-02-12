document.addEventListener("DOMContentLoaded", function () {
  let ngoCards = JSON.parse(localStorage.getItem("ngoCards")) || []; // here we retrived the cards from localStorage and set it to empty array if null
  const ngoCardsContainer = document.getElementById("ngo-cards-container"); // Container for displaying ngoCards
  const sortingOptions = document.getElementById("sorting");

  function sortAndDisplayCards(order) {
    // this function is used to display the cards
    ngoCardsContainer.innerHTML = ""; // ensuring that container is empty before adding sorted cards to maintain consistency
    if (order === "asc") {
      ngoCards.sort((a, b) => a.amount - b.amount);
    } else if (order === "desc") {
      ngoCards.sort((a, b) => b.amount - a.amount);
    }

    ngoCards.forEach(function (ngoCard) {
      const cardColumn = document.createElement("div");
      cardColumn.classList.add("col-md-6");

      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card");
      cardDiv.style.width = "100%";

      const cardImage = document.createElement("img");
      cardImage.classList.add("card-img-top");
      cardImage.src = ngoCard.imageUrl;
      cardImage.alt = "NGO Image";

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      const cardTitle = document.createElement("h5");
      cardTitle.classList.add("card-title");
      cardTitle.textContent = ngoCard.name;

      const cardText = document.createElement("p");
      cardText.classList.add("card-text");
      cardText.textContent = ngoCard.description;

      const cardBtn = document.createElement("button");
      cardBtn.textContent = "Donate";

      cardBtn.addEventListener("click", function () {
        let amount = prompt("Enter the amount");
        amount = parseInt(amount);
        if (Number.isNaN(amount)) {
          alert("Please enter a valid amount");
          return;
        }
        const newCards = ngoCards.map((ng) => {
          if (ng.id !== ngoCard.id) return ng;
          else {
            ng.amount += amount;
            return ng;
          }
        });
        localStorage.setItem("ngoCards", JSON.stringify(newCards));
        window.location.reload();
      });

      const amountText = document.createElement("p");
      amountText.textContent =
        "Total donation : " + JSON.stringify(ngoCard.amount);

      // Append elements
      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardText);
      cardDiv.appendChild(cardImage);
      cardDiv.appendChild(cardBody);
      cardDiv.appendChild(amountText);

      const isUserLoggedIn = localStorage.getItem("isUserLoggedIn");
      if (isUserLoggedIn && isUserLoggedIn !== "NO") {
        cardDiv.appendChild(cardBtn);
      }

      cardColumn.appendChild(cardDiv);
      ngoCardsContainer.appendChild(cardColumn);
    });
  }

  sortAndDisplayCards("asc"); // initially dislaying cards in ascending order (can do in dec also)

  sortingOptions.addEventListener("change", function () {
    const selectedOrder = sortingOptions.value;
    sortAndDisplayCards(selectedOrder);
  });

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

  if (localStorage.getItem("isUserLoggedIn") === "YES") {
    userLogin.style.display = "none";
    userSignup.style.display = "none";
    userLogout.style.display = "block";
    ngoLogoutBtn.style.display = "none";
  } else {
    userLogin.style.display = "block";
    userSignup.style.display = "block";
    userLogout.style.display = "none";
  }

  if (localStorage.getItem("isNGOLoggedIn") === "YES") {
    ngoLoginBtn.style.display = "none";
    ngoSignupBtn.style.display = "none";
    userLogout.style.display = "none";
    ngoLogoutBtn.style.display = "block";
  } else {
    ngoLoginBtn.style.display = "block";
    ngoSignupBtn.style.display = "block";
    ngoLogoutBtn.style.display = "none";
  }
  if (localStorage.getItem("isAdminLoggedIn") === "YES") {
    adminLoginBtn.style.display = "none";
    adminPageBtn.style.display = "block";
    userLogout.style.display = "block";
  } else {
    adminLoginBtn.style.display = "block";
    adminPageBtn.style.display = "none";
  }
  if (localStorage.getItem("isNGOLoggedIn") === "YES") {
    ngoPageBtn.style.display = "block";
  } else {
    ngoPageBtn.style.display = "none";
  }

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
});
