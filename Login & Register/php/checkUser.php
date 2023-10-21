<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get user input
    $username = trim($_POST["username"]);
    $password = trim($_POST["pass"]);


    $conn = new mysqli('localhost', 'root', '', 'test');

    if (!$conn) {
        die("Database connection failed: " . mysqli_connect_error());
    }else{
        // Prepare and execute a query to check if the user exists
        $query = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
        $result = mysqli_query($conn, $query);

        if (mysqli_num_rows($result) == 1) {
            // User found in the database
            echo "success";
            exit();
        } else {
            // User not found in the database
            echo "error";
        }
    }
    // Close the database connection
    mysqli_close($conn);
}
?>
