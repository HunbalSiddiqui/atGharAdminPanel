// Verifyin if user is logout
if(localStorage.getItem('jwt'))
{
    location.assign('./html/dashboard.html')
}

// Inputs
const inputEmail = document.querySelector('.credential-email')
const inputPasscode = document.querySelector('.credential-passcode')
const loginButton = document.querySelector('.login-btn')

// Alerts
const emptyAlert = document.querySelector('.emptyAlert-display')
const invalidAlert = document.querySelector('.invalidAlert-display')
const successAlert = document.querySelector('.successAlert-display')
loginButton.addEventListener('click', () => {
    // If both or any input is empty

    // If yes display message
    if (inputEmail.value === '' || inputPasscode.value === '') {
        invalidAlert.style.display = "none"
        emptyAlert.style.display = 'block'
    }
    // If no send request
    else {
        const email = inputEmail.value
        const password = inputPasscode.value
        verifyCredentials(email, password)
    }
})

// Verify Credentials
function verifyCredentials(email, password) {
    axios.post('https://atghar-testing.herokuapp.com/api/signin', {
            email,
            password
        })
        .then(response => {
            if (response.data) {
                invalidAlert.style.display = "none"
                successAlert.style.display = "block"
                console.log(response.data)
                authenticate(response.data, () => {
                    location.assign('./html/dashboard.html')
                })
            }
        })
        .catch(error => {
            emptyAlert.style.display = "none"
            invalidAlert.style.display = "block"
        });
}

// to keep the user loggedin
const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
}