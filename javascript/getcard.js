// Selecting the form and submit button
const form = document.querySelector('.address-form');
const submitButton = document.getElementById('submit-button');

// Adding event listener for form submission
form.addEventListener('submit', function(event) {
    // Preventing the default form submission behavior
    event.preventDefault();

    // Checking each input field for validity
    const inputs = form.querySelectorAll('input, select');
    let isValid = true;
    inputs.forEach(input => {
        // Checking if the input is valid
        if (!input.checkValidity()) {
            isValid = false;
            // Adding a class to highlight invalid inputs
            input.classList.add('invalid');
        } else {
            // Removing the class if the input is valid
            input.classList.remove('invalid');
        }
    });

    // If all inputs are valid, submit the form
    if (isValid) {
        // Optionally, you can submit the form programmatically
        // form.submit();
        console.log('Form submitted successfully!');
    } else {
        console.log('Form submission failed. Please fill in all the required fields correctly.');
    }
});

// Optional: Adding event listener for input change to remove the "invalid" class
form.addEventListener('input', function(event) {
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'SELECT') {
        if (event.target.checkValidity()) {
            event.target.classList.remove('invalid');
        } else {
            event.target.classList.add('invalid');
        }
    }
});
