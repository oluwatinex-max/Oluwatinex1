//ALERT
 alert("Click Ok below to register account or login");
    let text="Welcome to A1 Clothing Website";
// Get H
// TML elements

const registerBox = document.getElementById("registerBox");
const loginBox = document.getElementById("loginBox");
const dashboard = document.getElementById("dashboard");

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

const message = document.getElementById("message");

// Switch between registration and login
document.getElementById("showLogin").onclick = function(e) {
    e.preventDefault();
    registerBox.classList.add("hidden");
    loginBox.classList.remove("hidden");
    message.textContent = "";
};

document.getElementById("showRegister").onclick = function(e) {
    e.preventDefault();
    loginBox.classList.add("hidden");
    registerBox.classList.remove("hidden");
    message.textContent = "";
};

// Register a new user
registerForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim().toLowerCase();
    const password = document.getElementById("regPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password.length < 6) {
        message.style.color = "red";
        message.textContent = "Password must be at least 6 characters!";
        return;
    }

    if (password !== confirmPassword) {
        message.style.color = "red";
        message.textContent = "Passwords do not match!";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        message.style.color = "red";
        message.textContent = "Email already registered!";
        return;
    }

    const newUser = {
        name: name,
        email: email,
        password: password
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    message.style.color = "green";
    message.textContent = "Registration successful! Please login.";

    registerForm.reset();
});

// Login existing user
loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(function(user) {
        return user.email === email && user.password === password;
    });

    if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify({
            name: user.name,
            email: user.email
        }));

        loginBox.classList.add("hidden");
        registerBox.classList.add("hidden");
        dashboard.classList.remove("hidden");

        document.getElementById("welcomeMessage").textContent =
            "Welcome, " + user.name + "!";

        message.style.color = "green";
        message.textContent = "Login successful!";

        loginForm.reset();

    } else {
        message.style.color = "red";
        message.textContent = "Invalid email or password!";
    }
});

// Logout
document.getElementById("logoutBtn").onclick = function() {
    localStorage.removeItem("loggedInUser");

    dashboard.classList.add("hidden");
    loginBox.classList.remove("hidden");

    message.style.color = "green";
    message.textContent = "You have logged out successfully.";
};

// Restore dashboard if a user is already logged in
const savedUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (savedUser) {
    registerBox.classList.add("hidden");
    loginBox.classList.add("hidden");
    dashboard.classList.remove("hidden");

    document.getElementById("welcomeMessage").textContent =
        "Welcome, " + savedUser.name + "!";
}


if (user) {
    localStorage.setItem(
        "loggedInUser",
        JSON.stringify({
            name: user.name,
            email: user.email
        })
    );

    window.location.href = "Ayclothing.html";

} else {
    message.style.color = "red";
    message.textContent = "Invalid email or password!";
}
