<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
// Get form data
$username = $_POST["username"];
$email = $_POST["email"];
$password = $_POST["password"];
$confirmPassword = $_POST["confirmpassword"];
// Connect to the database
$conn = new mysqli('localhost', 'root', '', 'test');
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}else{
    $sql = "SELECT username, email FROM users WHERE username = ? OR email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $username, $email);
    $stmt->execute();
    $stmt->store_result();
    // If the username and email are unique, insert a new record in the users table
    if ($stmt->num_rows === 0) {
        $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $username, $email, $password);
        $stmt->execute();
        // username, email, and password inserted successfully
        echo "success";
    }else{
        // If the username and email are already taken, output error message
        echo "error";}
    //close statement
    $stmt->close();
    }
//close connection
$conn->close();
}
?>