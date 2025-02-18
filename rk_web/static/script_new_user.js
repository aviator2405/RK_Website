const feedback = document.getElementById('usernameFeedback');
feedback.textContent = "Create a new Username";

const submit_button = document.getElementById('submit_button');
submit_button.disabled = true;  // Initially disable the submit button

document.getElementById('username-field').addEventListener('input', function() {
    const username = this.value;
    const button = document.getElementById('submit_button')

    if (username.length > 0) {
        fetch(`/check_username/?username=${username}`)
            .then(response => response.json())
            .then(data => {
                if (data.is_taken) {
                    feedback.textContent = 'Username is already taken.';
                    feedback.className = 'error';
                    submit_button.disabled = true;
                } else {
                    feedback.textContent = 'Username is available.';
                    feedback.className = 'success';
                    submit_button.disabled = false;
                }
            });
    }
    else if (username.length == 0){
        feedback.textContent = "Create a new Username"
        submit_button.disabled = true;
    }
    else {
        feedback.textContent = '';
        feedback.className = '';
        submit_button.disabled = true;  // Disable submit buttonsubmit_button
    }
});

function validatePassword(event) {
    event.preventDefault();
    const password = document.getElementById("password-field").value;
    const confirmPassword = document.getElementById("re-password-field").value;
    // console.log(1)
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        // console.log(2)
        return false;
    }
    else if (password.length<=8){
        alert("Password TOO SHORT. Password length must greater then 8")
        // consol
        return false;
    }
    event.target.submit();  
    return true;
    
}

document.addEventListener('DOMContentLoaded', function () {
    // Get the form element by its ID
    const myForm = document.getElementById('login-form');

    // Add an event listener to the form's submit event
    myForm.addEventListener('submit', validatePassword);
  });