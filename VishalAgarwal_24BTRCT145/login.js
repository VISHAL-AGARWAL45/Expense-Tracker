document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;

    const data = new FormData();
    data.append("username", username);
    data.append("password", password);

    fetch("login.php", {
        method: "POST",
        body: data
    })
    .then(res => res.text())
    .then(response => {
        if (response.includes("Invalid")) {
            document.getElementById("error-msg").textContent = "❌ Invalid username or password";
        } else {
            window.location.href = "index.html";
        }
    });
});