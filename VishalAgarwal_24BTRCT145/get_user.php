<?php
session_start();
include "db.php";

/* 🔐 If user not logged in */
if (!isset($_SESSION['user_id'])) {
    echo "";
    exit();
}

/* 👤 Get user id from session */
$user_id = $_SESSION['user_id'];

/* 🔍 Fetch username */
$sql = "SELECT username FROM users WHERE id='$user_id'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    echo $user['username'];
} else {
    echo "";
}
?>