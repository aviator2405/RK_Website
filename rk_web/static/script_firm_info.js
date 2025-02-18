

function isInteger(text) {
    // Convert the text to a number
    const number = Number(text);
    // Check if the number is an integer and if the text is equal to the number when converted back to a string
    return Number.isInteger(number) && text === number.toString();
}

const validate =(number)=>{
    if (isInteger(number) && (number.length == 10)){
        return true;
    }
    else{
        return false;
    }
}

// TO GENERATE RANDOM CODE FOR OTP
function getRandomInt(min, max) {
    // Ensure min and max are integers
    min = Math.ceil(min);
    max = Math.floor(max);
    // Generate a random integer between min and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  

const prandomNumber = parseInt(getRandomInt(1000,9999));
const erandomNumber = parseInt(getRandomInt(1000,9999));

function phone_verified(){
    alert(prandomNumber);
    let enter_number= prompt("Enter the Phone Number verification otp");
    if (prandomNumber == enter_number){
        document.getElementById("phone_verification_status").textContent = "Verifed" ;
        return true
    }
    else{
        return false 
    }
}
function email_verified() {
    // Generate a random OTP (if not already generated)
    const erandomNumber = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

    // Define the API endpoint and payload
    const apiUrl = "http://127.0.0.1:8000/api/emailverfication/";
    const email = str(document.getElementById("email-field").value) // Prompt user to enter their email
    const payload = {
        email: email,
        otp: erandomNumber
    };

    // Send the OTP via POST API
    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to send OTP. Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("OTP sent successfully:", data);

            // Prompt user to enter the OTP
            let enter_number = prompt("Enter the email verification OTP:");
            if (parseInt(enter_number) === erandomNumber) {
                document.getElementById("email_verification_status").textContent = "Verified";
                alert("Email verified successfully!");
                return true;
            } else {
                alert("Invalid OTP. Verification failed.");
                return false;
            }
        })
        .catch(error => {
            console.error("Error sending OTP:", error);
            alert("Failed to send OTP. Please try again.");
            return false;
        });
}


function submitFunction(event){
    event.preventDefault();
    let number = document.getElementById("phone-field").value
    let phoneValidate = validate(number)
    if (!phoneValidate){
        alert("Enter proper number")
        return
    }
    let phone_status = phone_verified()
    let email_status = email_verified()
    if (phone_status && email_status && phoneValidate){
        console.log("successfully loaded in"); 
        event.target.submit();
    }
    else{
        alert("Invalid OTP")
    }
}
document.addEventListener('DOMContentLoaded', function () {
    // Get the form element by its ID
    const myForm = document.getElementById('login-form');

    // Add an event listener to the form's submit event
    myForm.addEventListener('submit', submitFunction);
  });