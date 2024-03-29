// var HEROKU_API = 'https://atghar-testing.herokuapp.com/api'
var HEROKU_API = 'https://www.atghar.com/api'

// Verifyin if user is login and has admin controls
if (!localStorage.getItem('jwt')) {
    location.assign('../index.html')
}
if (JSON.parse(localStorage.getItem("jwt")).user.role === 2) {
    // TODO: redirect to required page
    location.assign('./riderDashboard.html')
}
function loadLoader() {
    var loader = document.querySelector('.loader')
    loader.style.display = 'block'
}

function closeLoader() {
    var loader = document.querySelector('.loader')
    loader.style.display = 'none'
}
var adminname = document.querySelector('.adminname')
var adminemail = document.querySelector('.adminemail')
var adminpassword = document.querySelector('.adminpassword')
var newadminButton = document.querySelector('.newadminButton')

// admin signup
function adminSignup() {
    loadLoader()
    axios.post(`${HEROKU_API}/admin/signup`, {
            name: adminname.value,
            email: adminemail.value,
            password: adminpassword.value
        })
        .then((response) => {
            closeLoader()
            if (response.data) {
                var adminsuccess = document.querySelector('.adminsuccess')
                adminsuccess.style.display = "block"
                var adminfailure = document.querySelector('.adminfailure')
                adminfailure.style.display = "none"
            }
        })
        .catch((err) => {
            closeLoader()
            var adminsuccess = document.querySelector('.adminsuccess')
            adminsuccess.style.display = "none"
            var adminfailure = document.querySelector('.adminfailure')
            adminfailure.style.display = "block"
        })
}
newadminButton.addEventListener('click', () => {
    if (adminname.value === '' || adminemail.value === '' || adminpassword.value === '') {
        var adminsuccess = document.querySelector('.adminsuccess')
        adminsuccess.style.display = "none"
        var adminfailure = document.querySelector('.adminfailure')
        adminfailure.style.display = "block"
    } else {
        adminSignup()
    }
})


var ridername = document.querySelector('.ridername')
var riderphone = document.querySelector('.riderphone')
var rideremail = document.querySelector('.rideremail')
var riderpassword = document.querySelector('.riderpassword')
var newriderButton = document.querySelector('.newriderButton')
// admin signup
function riderSignup() {
    loadLoader()
    axios.post(`${HEROKU_API}/rider/signup`, {
            name: ridername.value,
            phone: riderphone.value,
            email: rideremail.value,
            password: riderpassword.value
        })
        .then((response) => {
            closeLoader()
            if (response.data) {
                var ridersuccess = document.querySelector('.ridersuccess')
                ridersuccess.style.display = "block"
                var riderfailure = document.querySelector('.riderfailure')
                riderfailure.style.display = "none"
                location.reload()
            }
        })
        .catch((error) => {
            console.log(error.response)
            closeLoader()
            var ridersuccess = document.querySelector('.ridersuccess')
            ridersuccess.style.display = "none"
            var riderfailure = document.querySelector('.riderfailure')
            riderfailure.style.display = "block"
        })
}
newriderButton.addEventListener('click', () => {
    if (ridername.value === '' || rideremail.value === '' || riderpassword.value === '') {
        var ridersuccess = document.querySelector('.ridersuccess')
        ridersuccess.style.display = "none"
        var riderfailure = document.querySelector('.riderfailure')
        riderfailure.style.display = "block"
    } else {
        riderSignup()
    }
})