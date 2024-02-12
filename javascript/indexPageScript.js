// var isLoggedIn=false;
// let ngoData=[];
const container = document.getElementById("ngoContainer");
container.innerHTML = ''; 

// function renderNgoCards(ngoData) {
//   // Clearing existing content in container
//   // container.innerHTML = '';

//   ngoData.forEach(ngo => {
//       const ngoDiv = document.createElement('div');
//       ngoDiv.classList.add('ngo');
//       ngoDiv.innerHTML = `
//           <img src="${ngo.image_url}" alt="${ngo.name}">
//           <h3>${ngo.name}</h3>
//           <p>${ngo.description}</p>
//           <p>Available balance: $${ngo.available_balance}</p>
//       `;
//       const donateButton=document.createElement('button');
//         donateButton.classList.add='donate'
//         donateButton.innerHTML='donate now'
//         donateButton.style.backgroundColor = '#4CAF50'; 
//         donateButton.style.color = 'white'; 
//         donateButton.style.padding = '10px 20px'; 
//         donateButton.style.fontSize = '16px'; 
//         donateButton.style.border = 'none'; 
//         donateButton.style.borderRadius = '5px'; 
//         donateButton.style.cursor='pointer';
        
//         donateButton.addEventListener('click',()=>
//         {console.log('button clicked')
//           if(!isLoggedIn)
//           alert('please login first to donate')
      
//           else window.location.href='donationPage.html'}    
// )
         
      
//         ngoDiv.appendChild(donateButton)
//       container.appendChild(ngoDiv);
//   });
// }

let data = []; 
document.addEventListener("DOMContentLoaded", function () {
    const paginationContainer = document.getElementById("paginationContainer");
    const loadMoreButton = document.getElementById("loadMoreButton");
    let currentPage = 1;
    const cardsPerPage = 6;
  
    function renderCards(startIndex, endIndex) {
        // container.innerHTML = ''; //
        const currentData = data.slice(startIndex, endIndex);
        currentData.forEach(ngo => {
            const ngoDiv = document.createElement('div');
            ngoDiv.classList.add('ngo');
  
            const imageUrl = ngo.image_url || 'https://via.placeholder.com/400x300';
  
            ngoDiv.innerHTML = `
                <img src="${imageUrl}" alt="${ngo.name}">
                <h3>${ngo.name}</h3>
                <p>${ngo.description}</p>
                <p>Available balance: $ ${ngo.available_balance}</p>
            `;
  
            const donateButton = document.createElement('button');
            donateButton.textContent = 'Donate Now';
            donateButton.classList.add('donate');
            donateButton.style.backgroundColor = '#4CAF50'; 
            donateButton.style.color = 'white'; 
            donateButton.style.padding = '10px 20px'; 
            donateButton.style.fontSize = '16px';
            donateButton.style.border = 'none'; 
            donateButton.style.borderRadius = '5px';
  
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
  
      
        if ((currentPage-1) * cardsPerPage >= data.length) {
            loadMoreButton.style.display = 'none';
        }
    }
  
    // Fetch data from ngo_data.json
    fetch('ngo_data.json')
        .then(response => response.json())
        .then(jsonData => {
            data = jsonData;
  
            // Initially load first page of cards
            loadMore();
  
            if (currentPage * cardsPerPage < data.length) {
                loadMoreButton.style.display = 'block';
            }
  
            loadMoreButton.addEventListener('click', loadMore);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
  });

//***********************************************************************/








