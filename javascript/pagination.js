document.addEventListener("DOMContentLoaded", function () {
  const ngoCards = JSON.parse(localStorage.getItem("ngoCards")) || [];
  const container = document.getElementById("ngo-cards-container");
  container.innerHTML = "";

  const cardsPerPage = 6;
  let currentPage = 1;

  function renderNgoCards(startIndex, endIndex) {
    for (let i = startIndex; i < endIndex; i++) {
      if (ngoCards[i]) {
        const ngoCard = ngoCards[i];
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
          ngoCards[i].amount += amount;
          localStorage.setItem("ngoCards", JSON.stringify(ngoCards));
          window.location.reload();
        });

        const amountText = document.createElement("p");
        amountText.textContent =
          "Total donation : " + JSON.stringify(ngoCard.amount);

        cardBody.appendChild
        cardDiv.appendChild(cardBtn);

        cardColumn.appendChild(cardDiv);
        container.appendChild(cardColumn);
      }(cardTitle);
        cardBody.appendChild(cardText);
        cardDiv.appendChild(cardImage);
        cardDiv.appendChild(cardBody);
        cardDiv.appendChild(amountText);
    }
  }

  function loadMore() {
    const startIndex = currentPage * cardsPerPage;
    const endIndex = (currentPage + 1) * cardsPerPage;
    renderNgoCards(startIndex, endIndex);
    currentPage++;
  }

  renderNgoCards(0, cardsPerPage);

  const loadMoreButton = document.getElementById("loadMoreButton");
  if (ngoCards.length > cardsPerPage) {
    loadMoreButton.style.display = "block";
  } else {
    loadMoreButton.style.display = "none";
  }

  loadMoreButton.addEventListener("click", function () {
    loadMore();
    if ((currentPage + 1) * cardsPerPage >= ngoCards.length) {
      loadMoreButton.style.display = "none";
    }
  });
});
