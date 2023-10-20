function submitForm() {
    // Prevent the default form submission
    event.preventDefault();
    // Get form elements values
    var username = document.getElementById("username").value.trim();
    var email = document.getElementById("email").value.trim();
    var password = document.getElementById("password").value.trim();
    var confirmPassword = document.getElementById("confirm-password").value.trim();
    if (!validateForm()) {
        return false; // Prevent the form from submitting if validation fails
    }
    // make a form data object
    var formData = "username=" + encodeURIComponent(username) + "&email=" + encodeURIComponent(email) + "&password=" + encodeURIComponent(password) + "&confirmpassword=" + encodeURIComponent(confirmPassword);
    // Perform an AJAX request
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../test/php/registerUser.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            if (xhr.responseText === "success") {
                // User registered successfully
                alert("User registered Successfully!");
                document.getElementById("username").value = "";
                document.getElementById("email").value = "";
                document.getElementById("password").value = "";
                document.getElementById("confirm-password").value = "";
                document.getElementById("error-message").innerHTML = "";
            }else{
                // Username or Email already exists
                document.getElementById("error-message").innerHTML = "Username or Email already exists!";
                addError(document.getElementById("username"));
                addError(document.getElementById("email"));
            }
        }
    };
    
    // Send the form data to the PHP script
    xhr.send(formData);

    return false; // Prevent the form from submitting
}

function validateForm() {
    const emailvalidation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // Get form elements
    var usernameInput = document.getElementById("username");
    var emailInput = document.getElementById("email");
    var passwordInput = document.getElementById("password");
    var confirmPasswordInput = document.getElementById("confirm-password");
    var errorMessage = document.getElementById("error-message");
    // Get form elements values
    var username = usernameInput.value.trim();
    var email = emailInput.value.trim();
    var password = passwordInput.value.trim();
    var confirmPassword = confirmPasswordInput.value.trim();
    // Reset border colors
    removeError(usernameInput);
    removeError(emailInput);
    removeError(passwordInput);
    removeError(confirmPasswordInput);

    if (username.length < 8 || username.includes(" ")) {
        errorMessage.innerHTML = "Username must be at least 8 characters long and should not contain spaces";
        addError(usernameInput);
        return false;
    }

    if (!emailvalidation.test(String(email).toLowerCase())) {
        errorMessage.innerHTML = "Invalid email address";
        addError(emailInput);
        return false;
    }

    if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
        errorMessage.innerHTML = "Password must be at least 8 characters long and contain at least one uppercase and one lowercase character.";
        addError(passwordInput);
        return false;
    }

    if (password !== confirmPassword) {
        errorMessage.innerHTML = "Password and Confirm Password do not match";
        addError(passwordInput);
        addError(confirmPasswordInput);
        return false;
    }

    // If all validations pass, clear the error message and reset border colors
    errorMessage.innerHTML = "";
    return true;
}

function addError(inputElement) {
    inputElement.classList.add("invalid");
}

function removeError(inputElement) {
    inputElement.classList.remove("invalid");
}