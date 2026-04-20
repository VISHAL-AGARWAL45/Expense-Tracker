<?php
session_start();
include "db.php";

if (!isset($_SESSION['user_id'])) {
    die("Not logged in");
}

$user_id = $_SESSION['user_id'];

$name = $_POST['name'];
$amount = $_POST['amount'];
$category = $_POST['category'];
$date = $_POST['date'];

$sql = "INSERT INTO expenses (user_id, name, amount, category, date)
VALUES ('$user_id', '$name', '$amount', '$category', '$date')";

$conn->query($sql);

echo "success";
?>