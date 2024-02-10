var isLoggedIn=false;

document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("ngoContainer");
  
    fetch('ngo_data.json')
      .then(response => response.json())
      .then(data => {
        data.forEach(ngo => {
          const ngoDiv = document.createElement('div');
          ngoDiv.classList.add('ngo');
  
          const imageUrl = ngo.image_url || 'https://via.placeholder.com/400x300';
  
          ngoDiv.innerHTML = `
            <img src="${imageUrl}" alt="${ngo.name}">
            <h3>${ngo.name}</h3>
            <p>${ngo.description}</p>
            <p>Available balance : $ ${ngo.available_balance}</p>
          `;

          const donateButton=document.createElement('button');
          donateButton.classList.add='donate'
          donateButton.innerHTML='donate now'

          
          donateButton.addEventListener('click',()=>
          {console.log('button clicked')
            if(!isLoggedIn)
            alert('please login first to donate')
        
            else window.location.href='donationPage.html'
            }    
            )
           
        
          ngoDiv.appendChild(donateButton)
          container.appendChild(ngoDiv);
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  });
  