
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector(".auth-form");
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault(); 
  
      const email = loginForm.email.value.trim();
      const password = loginForm.password.value.trim();
      if (email === "" || password === "") {
        alert("Please fill in all fields.");
        return;
      }
      alert(`Welcome back! Logged in as ${email}`);
      window.location.href = "index.html";
    });
  });
  