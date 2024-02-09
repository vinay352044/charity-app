document.addEventListener('DOMContentLoaded', function () {
    // Retrieve NGO cards from localStorage
    const ngoCards = JSON.parse(localStorage.getItem('ngoCards')) || [];

    // Select the container where NGO cards will be displayed
    const ngoCardsContainer = document.getElementById('ngo-cards-container');

    // Loop through each NGO card and create HTML elements to display them
    ngoCards.forEach(function (ngoCard) {
      // Create card elements
      const cardColumn = document.createElement('div');
      cardColumn.classList.add('col-md-6');

      const cardDiv = document.createElement('div');
      cardDiv.classList.add('card');
      cardDiv.style.width = '100%';

      const cardImage = document.createElement('img');
      cardImage.classList.add('card-img-top');
      cardImage.src = 'https://vakilsearch.com/blog/wp-content/uploads/2021/05/VS_Blog-Images_3-05.png';
      cardImage.alt = 'NGO Image';

      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');

      const cardTitle = document.createElement('h5');
      cardTitle.classList.add('card-title');
      cardTitle.textContent = ngoCard.name;

      const cardText = document.createElement('p');
      cardText.classList.add('card-text');
      cardText.textContent = ngoCard.description;

      // Append elements
      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardText);
      cardDiv.appendChild(cardImage);
      cardDiv.appendChild(cardBody);
      cardColumn.appendChild(cardDiv);
      ngoCardsContainer.appendChild(cardColumn);
    });
  });