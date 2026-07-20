// SIGNUP FORM
const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", function(e){

    e.preventDefault();

    // INPUT VALUES
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const terms = document.getElementById("terms").checked;

    // REGEX
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // VALIDATION

    if(name === ""){
        alert("Please enter your full name.");
        return;
    }

    if(name.length < 3){
        alert("Name must contain at least 3 characters.");
        return;
    }

    if(!emailPattern.test(email)){
        alert("Please enter a valid email.");
        return;
    }

    if(!passwordPattern.test(password)){
        alert(
`Password must contain:

• Minimum 8 characters
• One uppercase letter
• One lowercase letter
• One number
• One special character`
        );
        return;
    }

    if(password !== confirmPassword){
        alert("Passwords do not match.");
        return;
    }

    if(!terms){
        alert("Please accept the Terms & Conditions.");
        return;
    }

    // GET EXISTING USERS

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // CHECK DUPLICATE EMAIL

    const userExists = users.find(user => user.email === email);

    if(userExists){
        alert("An account with this email already exists.");
        return;
    }

    // CREATE USER

    const newUser = {

        name:name,
        email:email,
        password:password

    };

    // SAVE USER

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully!");

    signupForm.reset();

    window.location.href = "dashboard.html";

});
