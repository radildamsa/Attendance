<?php
include('db.php'); // Ensure this file contains your $conn connection

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validate and sanitize inputs
    $firstname = htmlspecialchars($_POST['firstname']);
    $lastname = htmlspecialchars($_POST['lastname']);
    $username = htmlspecialchars($_POST['username']);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL); // Sanitize email
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT);

    // Basic validation to check if required fields are not empty
    if (empty($firstname) || empty($lastname) || empty($username) || empty($email) || empty($_POST['password'])) {
        echo "All fields are required.";
        exit;
    }

    // Prepare and bind parameters
    $stmt = $conn->prepare("INSERT INTO users1 (first_name, last_name, username	, email, password) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $firstname, $lastname, $username, $email, $password);

    // Execute statement
    if ($stmt->execute()) {
        // Redirect to the new HTML page
        header("Location: createAccount.html");
        exit(); // Make sure to call exit after header to stop script execution
        
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close statement and connection
    $stmt->close();
    $conn->close();
}
?>
