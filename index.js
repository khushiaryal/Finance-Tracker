// Check login status
if(localStorage.getItem("loggedIn") !== "true"){
    window.location.href = "index.html";
}

// Show logged in user's name (optional)
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if(currentUser){

    const username = document.getElementById("username");

    if(username){
        username.textContent = currentUser.name;
    }

}

// Logout function
function logout(){

    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");

    window.location.href = "index.html";

}
