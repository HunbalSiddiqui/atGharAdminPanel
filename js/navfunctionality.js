function loadLoader() {
    var loader = document.querySelector('.loader')
    loader.style.display = 'block'
}

function closeLoader() {
    var loader = document.querySelector('.loader')
    loader.style.display = 'none'
}
// Getting all nav items.
var navItems = document.querySelectorAll('.nav-custom-item')
// Set active nav item
function setActiveNav() {
    navItems.forEach(item => {
        if (window.location.pathname.includes(item.name)) {
            item.classList.add("nav-custom-item-active")
        }
    });
}
setActiveNav()

// Navigation
function navigation() {
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            location.assign(`./${item.name}.html`)
        })
    });
}
navigation()

const signoutButton = document.querySelector(".signout-btn")



// On signout button click
signoutButton.addEventListener('click', () => {
    signout(() => {
        location.assign('../index.html')
    })
})

// Signout from backend and frontend
function signout(next) {
    if (typeof window !== "undefined") {
        const userId = JSON.parse(localStorage.getItem("jwt")).user._id;
        const token = JSON.parse(localStorage.getItem("jwt")).token
        loadLoader()
        axios.get(`https://atghar-testing.herokuapp.com/api/signout/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                if (!localStorage.getItem('jwt')) {
                    return {
                        message: "No user is logged in"
                    }
                }
                localStorage.removeItem("jwt")
                next(); //we can have a debate on wether to keep it here or at the end.
            })
            .catch((err) => {
                console.log(err)
            })

    }
}

// New promo
var newpromocode = document.querySelector('.newpromocode')
var promocodename = document.querySelector('.promocodename')
var promocodediscount = document.querySelector('.promocodediscount')
var introducenewpromocode = document.querySelector('.introducenewpromocode')
// Function
function introduceNewpromocode() {
    const promoObj = {
        name: promocodename.value,
        offPercentage: promocodediscount.value
    }
    loadLoader()
    axios.post('https://atghar-testing.herokuapp.com/api/promocode/create', {
            name: promocodename.value,
            offPercentage: promocodediscount.value
        })
        .then((response) => {
            closeLoader()
            if (response.data) {
                var promosuccess = document.querySelector('.promosuccess')
                promosuccess.style.display = "block"
                var promofailure = document.querySelector('.promofailure')
                promofailure.style.display = "none"
            }
        })
        .catch((err) => {
            closeLoader()
            var promofailure = document.querySelector('.promofailure')
            promofailure.style.display = "block"
            var promosuccess = document.querySelector('.promosuccess')
            promosuccess.style.display = "none"
        })
}
introducenewpromocode.addEventListener('click', () => {
    introduceNewpromocode()
})