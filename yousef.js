document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form from submitting traditionally

        // Get input values
        const fullName = document.getElementById("fullName").value.trim();
        const emailAddress = document.getElementById("emailAddress").value.trim();
        const mobileNumber = document.getElementById("mobileNumber").value.trim();
        const emailSubject = document.getElementById("emailSubject").value.trim();
        const message = document.getElementById("message").value.trim();

        // Validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?\d{10,15}$/;

        // Validation checks
        if (fullName === "" || emailAddress === "" || mobileNumber === "" || emailSubject === "" || message === "") {
            alert("Please fill in all fields.");
            return;
        }

        if (!emailRegex.test(emailAddress)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (!phoneRegex.test(mobileNumber)) {
            alert("Please enter a valid phone number (10-15 digits, optional + at start).");
            return;
        }

        // Store in localStorage
        const formData = {
            fullName,
            emailAddress,
            mobileNumber,
            emailSubject,
            message
        };

        localStorage.setItem("contactFormData", JSON.stringify(formData));
        alert("Form submitted successfully!");

        // Optionally clear the form
        form.reset();
    });
});
