document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.querySelector(".auth-form");
    const errorMessage = document.createElement('p');
    errorMessage.className = 'error-message';
    signupForm.prepend(errorMessage);

    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = signupForm.name.value.trim();
        const email = signupForm.email.value.trim();
        const password = signupForm.password.value.trim();

        if (!name || !email || !password) {
            errorMessage.textContent = "Please fill in all fields.";
            errorMessage.style.display = 'block';
            return;
        }

        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!emailPattern.test(email)) {
            errorMessage.textContent = "Please enter a valid email address.";
            errorMessage.style.display = 'block';
            return;
        }

        if (password.length < 6) {
            errorMessage.textContent = "Password should be at least 6 characters long.";
            errorMessage.style.display = 'block';
            return;
        }

        // Check if email already exists
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.some(user => user.email === email)) {
            errorMessage.textContent = "Email already registered.";
            errorMessage.style.display = 'block';
            return;
        }

        // Create new user
        const newUser = {
            id: Date.now(),
            name,
            email,
            password
        };

        // Save user
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Auto login
        localStorage.setItem('currentUser', JSON.stringify(newUser));

        alert("Signup successful! You can now log in.");
        window.location.href = "login.html";
    });
});