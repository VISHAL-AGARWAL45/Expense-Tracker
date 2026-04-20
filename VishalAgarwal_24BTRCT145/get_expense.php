<?php
session_start();
include "db.php";

if (!isset($_SESSION['user_id'])) {
    die("Not logged in");
}

$user_id = $_SESSION['user_id'];

$sql = "SELECT * FROM expenses WHERE user_id='$user_id'";
$result = $conn->query($sql);

$expenses = [];

while($row = $result->fetch_assoc()) {
    $expenses[] = $row;
}

echo json_encode($expenses);
?>