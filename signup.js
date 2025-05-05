document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.querySelector(".auth-form");  
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = signupForm.name.value.trim();
      const email = signupForm.email.value.trim();
      const password = signupForm.password.value.trim();
      if (!name || !email || !password) {
        alert("Please fill in all the fields.");
        return;
      }
      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }
      if (password.length < 6) {
        alert("Password should be at least 6 characters long.");
        return;
      }
      const user = {
        name: name,
        email: email,
        password: password, 
      };
      localStorage.setItem("user", JSON.stringify(user));
      alert("Signup successful! You can now log in.");
      window.location.href = "login.html";
    });
  });
  