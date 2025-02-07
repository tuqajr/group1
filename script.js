document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');

    // Load saved data from localStorage (if any)
    const savedData = JSON.parse(localStorage.getItem('contactFormData')) || {};
    document.getElementById('fullName').value = savedData.fullName || '';
    document.getElementById('emailAddress').value = savedData.emailAddress || '';
    document.getElementById('mobileNumber').value = savedData.mobileNumber || '';
    document.getElementById('emailSubject').value = savedData.emailSubject || '';
    document.getElementById('message').value = savedData.message || '';

    // Save form data to localStorage on form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        // Get form data
        const formData = {
            fullName: document.getElementById('fullName').value,
            emailAddress: document.getElementById('emailAddress').value,
            mobileNumber: document.getElementById('mobileNumber').value,
            emailSubject: document.getElementById('emailSubject').value,
            message: document.getElementById('message').value,
        };

        // Save data to localStorage
        localStorage.setItem('contactFormData', JSON.stringify(formData));

        // Optional: Display a success message or clear the form
        alert('Form data saved successfully!');
        form.reset(); // Clear the form after submission
    });
});