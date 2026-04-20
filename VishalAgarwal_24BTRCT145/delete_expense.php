<?php
session_start();
include "db.php";

if (!isset($_SESSION['user_id'])) {
    die("Not logged in");
}

if (!isset($_GET['id'])) {
    die("No ID");
}

$id = $_GET['id'];
$user_id = $_SESSION['user_id'];

/* 🔥 IMPORTANT: delete only user's data */
$sql = "DELETE FROM expenses WHERE id='$id' AND user_id='$user_id'";

if ($conn->query($sql)) {
    echo "success";
} else {
    echo "error";
}
?>