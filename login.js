document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector(".auth-form");
    const errorMessage = document.createElement('p');
    errorMessage.className = 'error-message';
    loginForm.prepend(errorMessage);

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const email = loginForm.email.value.trim();
        const password = loginForm.password.value.trim();

        if (email === "" || password === "") {
            errorMessage.textContent = "Please fill in all fields.";
            errorMessage.style.display = 'block';
            return;
        }

        // Simulate login
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = "index.html";
        } else {
            errorMessage.textContent = "Invalid email or password.";
            errorMessage.style.display = 'block';
        }
    });
});