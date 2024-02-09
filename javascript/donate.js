
document.addEventListener('DOMContentLoaded', function () {
    const donateForm = document.getElementById('donate-form')
    donateForm.addEventListener('submit', function (e) {
        e.preventDefault()
        const amount = JSON.stringify(document.getElementById('amount').value);
        localStorage.setItem('donationAmount', amount)
        let result = JSON.parse(localStorage.getItem('donationAmount'))
        const heluElement = document.getElementById('para');
        console.log(result)
        
        heluElement.textContent =  result;
    });
});
