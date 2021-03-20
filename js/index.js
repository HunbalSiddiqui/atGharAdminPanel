// var HEROKU_API = 'https://atghar-testing.herokuapp.com/api'
// var API = 'https://www.atghar.com/api'
var HEROKU_API = 'https://www.atghar.com/api'

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
const loginas = document.querySelector('.loginas')
// On button click
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
    if(loginas.value==='admin')
    {
        axios.post(`${HEROKU_API}/admin/signin`, {
            email,
            password
        })
        .then(response => {
            if (response.data) {
                invalidAlert.style.display = "none"
                successAlert.style.display = "block"
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
    else if(loginas.value==='rider')
    {
        axios.post('https://atghar-testing.herokuapp.com/api/rider/signin', {
            email,
            password
        })
        .then(response => {
            console.log(response.data)
            if (response.data) {
                invalidAlert.style.display = "none"
                successAlert.style.display = "block"
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
}

// to keep the user loggedin
const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
}