// Object to store card data
const cardData = {
    nfcAvailable: false, // Set to false if NFC card is not available
    customUrl: "https://example.com"
};

// Function to check NFC card availability and display options accordingly
function checkNfcStatus() {
    const nfcStatusElement = document.getElementById('nfcStatus');
    const cardOptionsElement = document.getElementById('cardOptions');
    const getCardOptionsElement = document.getElementById('getCardOptions');

    if (cardData.nfcAvailable) {
        nfcStatusElement.innerText = "NFC Card is available.";
        cardOptionsElement.style.display = 'block';
        getCardOptionsElement.style.display = 'none';
    } else {
        nfcStatusElement.innerText = "NFC Card is not available.";
        cardOptionsElement.style.display = 'none';
        getCardOptionsElement.style.display = 'block';
    }
}

// Function to edit the custom URL
function editCustomUrl() {
    const customUrlElement = document.getElementById('customUrl');
    customUrlElement.contentEditable = 'true';
    customUrlElement.classList.add('editable');
}

// Function to toggle the editable state of the input box
// function toggleEditMode(field) {
//     const inputElement = document.getElementById(field);
//     const editButton = document.querySelector(`#${field}Section button`);

//     if (inputElement.readOnly) {
//       // Enable editing
//       inputElement.readOnly = false;
//       inputElement.classList.add('editable');
//       editButton.innerHTML = '<i class="fas fa-check"></i>';
//     } else {
//       // Save changes and disable editing
//       inputElement.readOnly = true;
//       inputElement.classList.remove('editable');
//       editButton.innerHTML = '<i class="far fa-edit"></i>'; // Replace with your icon for editing
//       saveProfileData(field, inputElement.value);
//     }
//   }

function saveField(field) {
    const inputElement = document.getElementById(field);
    const value = inputElement.value;

    // Implement the logic to save the changes (replace with your actual update logic)
    console.log(`Updated ${field} to: ${value}`);
}

// Function to get the card (dummy implementation)
function getCard() {
    // Implement the logic to get the card (replace with your actual logic)
    alert('Getting your card...');
}

// Initialize the NFC status on page load
document.addEventListener('DOMContentLoaded', function () {
    checkNfcStatus();
});

// ... (Remaining JavaScript code) ...


function redirectToCard() {
    // Show the My Card content and hide others
    document.getElementById('homeContent').style.display = 'none';
    document.getElementById('purchasesContent').style.display = 'none';
    document.getElementById('profileContent').style.display = 'none';
    document.getElementById('cardContent').style.display = 'block';
}

function redirectToPurchases() {
    // Show the My Purchases content and hide others
    document.getElementById('homeContent').style.display = 'none';
    document.getElementById('purchasesContent').style.display = 'block';
    document.getElementById('profileContent').style.display = 'none';
    document.getElementById('cardContent').style.display = 'none';
}


document.getElementById('home').addEventListener('click', function () {
    // Show the Home content and hide others
    document.getElementById('homeContent').style.display = 'block';
    document.getElementById('purchasesContent').style.display = 'none';
    document.getElementById('profileContent').style.display = 'none';
    document.getElementById('cardContent').style.display = 'none';
});

document.getElementById('purchases').addEventListener('click', function () {
    // Show the My Purchases content and hide others
    redirectToPurchases();
});

document.getElementById('profile').addEventListener('click', function () {
    // Show the Profile content and hide others
    document.getElementById('homeContent').style.display = 'none';
    document.getElementById('purchasesContent').style.display = 'none';
    document.getElementById('profileContent').style.display = 'block';
    document.getElementById('cardContent').style.display = 'none';
});

document.getElementById('card').addEventListener('click', function () {
    // Show the My Card content and hide others
    redirectToCard();
});
