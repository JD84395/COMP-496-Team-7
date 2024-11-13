// Function to handle login
function login(event) {
    event.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    // Simple front-end validation (you would handle real validation on the server)
    if (email === "test@test.com" && password === "password") {
        alert("Login successful!");
        // Redirect user or load dashboard here
    } else {
        alert("Invalid email or password!");
    }
}

// Function to handle signup
function signup(event) {
    event.preventDefault();

    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    // In a real app, you would send this data to your server
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);

    alert("Account created successfully!");

    // After signup, switch to login
    switchToLogin();
}

// Function to switch to signup form
function switchToSignup() {
    document.getElementById("login-container").classList.remove("active");
    document.getElementById("signup-container").classList.add("active");
}

// Function to switch to login form
function switchToLogin() {
    document.getElementById("signup-container").classList.remove("active");
    document.getElementById("login-container").classList.add("active");
}

// Initially, display the login form
document.getElementById("login-container").classList.add("active");
