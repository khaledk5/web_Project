function submitForm() {
    // Prevent the default form submission
    event.preventDefault();
    // Get form elements
    var usernameInput = document.getElementById("username");
    var passwordInput = document.getElementById("password");
    // Get form elements values
    var username = document.getElementById("username").value.trim();
    var password = document.getElementById("password").value.trim();
    // Perform an AJAX request
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../test/php/checkUser.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            if (xhr.responseText === "success") {
                // User found in the database, redirect to the home page
                removeError(usernameInput);
                removeError(passwordInput);
                alert("Successful Login!");
                errorMessage.innerHTML = "";
            }else{
                // User not found ,or Invalid username or password
                showError("Invalid username or password.");
                removeError(usernameInput);
                removeError(passwordInput);
                addError(usernameInput);
                addError(passwordInput);
                document.getElementById("password").value = "";
            }
        }
    };
    
    // Send the form data to the PHP script
    var data = "username=" + username + "&pass=" + password;
    xhr.send(data);

    return false; // Prevent the form from submitting
}

function addError(inputElement) {
    inputElement.classList.add("invalid");
}

function removeError(inputElement) {
    inputElement.classList.remove("invalid");
}

// Function to display the error message
function showError(message) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    errorDiv.style.opacity = 1;
    // Hide the error message after 5 seconds
    setTimeout('hideError()', 5000);
}

// Function to hide the error message
function hideError() {
    const errorDiv = document.getElementById('error-message');
    errorDiv.style.opacity = 0;
    setTimeout(() => {
        errorDiv.style.display = 'none';
      }, 3500);
}