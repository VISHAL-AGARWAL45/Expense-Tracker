<?php
include "db.php";

$username = $_POST['username'];
$password = $_POST['password'];

/* Check if user already exists */
$check = "SELECT * FROM users WHERE username='$username'";
$result = $conn->query($check);

if ($result->num_rows > 0) {
    echo "❌ Username already exists";
} else {
    /* Insert new user */
    $sql = "INSERT INTO users (username, password)
            VALUES ('$username', '$password')";

    if ($conn->query($sql)) {
        echo "✅ Account created successfully! <br>";
        echo "<a href='login.html'>Go to Login</a>";
    } else {
        echo "Error: " . $conn->error;
    }
}
?>