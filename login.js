const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(e){

    e.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    // Email validation
    if(email === ""){
        alert("Please enter your email.");
        return;
    }

    // Password validation
    if(password === ""){
        alert("Please enter your password.");
        return;
    }

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if any user exists
    if(users.length === 0){
        alert("No account found. Please sign up first.");
        window.location.href = "signup.html";
        return;
    }

    // Find matching user
    const validUser = users.find(user =>
        user.email === email &&
        user.password === password
    );

    if(validUser){

        // Save login session
        localStorage.setItem("loggedIn", "true");

        // Save current logged in user
        localStorage.setItem("currentUser", JSON.stringify(validUser));

        alert("Login Successful!");

        window.location.href = "dashboard.html";

    }else{

        alert("Invalid Email or Password!");

    }

});
