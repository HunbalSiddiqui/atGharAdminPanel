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
        axios.get(`https://atghar-testing.herokuapp.com/api/admin/signout/`, {
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
    const token = JSON.parse(localStorage.getItem('jwt')).token
    axios.post('https://atghar-testing.herokuapp.com/api/promocode/create', {
            name: promocodename.value,
            offPercentage: promocodediscount.value
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            closeLoader()
            if (response.data) {
                var promosuccess = document.querySelector('.promosuccess')
                promosuccess.style.display = "block"
                var promofailure = document.querySelector('.promofailure')
                promofailure.style.display = "none"
                location.reload()
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

// Add new product
var productcategory = document.querySelector('.productcategory')
// Cateogries
function displayCategories() {
    // Grocery
    if (productcategory) {
        productcategory.innerHTML = ''
        productcategory.insertAdjacentHTML('beforeend',
            `
        <option selected>Choose</option>
        
        `)
        axios.get(`https://atghar-testing.herokuapp.com/api/categories/grocery`)
            .then((response) => {
                response.data.map((category) => {
                    return (
                        productcategory.insertAdjacentHTML('beforeend',
                            `
                        <option value="${category.name}">${category.name}</option>
                
                        `)
                    )
                })

            })
        // Pharmacy
        axios.get(`https://atghar-testing.herokuapp.com/api/categories/pharmacy`)
            .then((response) => {
                response.data.map((category) => {
                    return (
                        productcategory.insertAdjacentHTML('beforeend',
                            `
                    <option value="${category.name}">${category.name}</option>
            
                    `)
                    )
                })

            })
    }

}
displayCategories()
// Subcateogries
productcategory.addEventListener('change', () => {
    displaySubCategories(productcategory.value)
})
var productsubcategory = document.querySelector('.productsubcategory')

function displaySubCategories(category) {
    // Grocery
    productsubcategory.innerHTML = ''
    axios.get(`https://atghar-testing.herokuapp.com/api/subcategories/${category}`)
        .then((response) => {
            response.data.map((category) => {
                return (
                    productsubcategory.insertAdjacentHTML('beforeend',
                        `
                    <option value="${category.name}">${category.name}</option>
            
                    `)
                )
            })

        })
}

// Creating
var productsubcategory = document.querySelector('.productsubcategory')
var productcategory = document.querySelector('.productcategory')
var productname = document.querySelector('.productname')
var productprice = document.querySelector('.productprice')
var producttype = document.querySelector('.producttype')
var featuredFlag = document.querySelector('.featuredFlag')
var productObj = {}
var createProductBtn = document.querySelector('.createProductBtn')
createProductBtn.addEventListener('click', () => {
    productObj = {
        productname: productname.value,
        price: productprice.value,
        type: producttype.value,
        category: productcategory.value,
        subcategory: productsubcategory.value,
        featured: featuredFlag.checked
    }
    createProduct(productObj)
})

function createProduct(productDetails) {
    loadLoader()
    const admin = JSON.parse(localStorage.getItem('jwt')).user
    const token = JSON.parse(localStorage.getItem('jwt')).token
    axios.post(`https://atghar-testing.herokuapp.com/api/admin/${admin._id}/product/create/`,
            productDetails, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        .then((response) => {
            closeLoader()
            var productsuccess = document.querySelector('.productsuccess')
            productsuccess.style.display = "block"
            var productfailure = document.querySelector('.productfailure')
            productfailure.style.display = "none"
            location.reload()
        })
        .catch((err) => {
            closeLoader()
            var productfailure = document.querySelector('.productfailure')
            productfailure.style.display = "block"
            var productsuccess = document.querySelector('.productsuccess')
            productsuccess.style.display = "none"
        })

}


var productimg = document.querySelector('.productimg')

function uploadProductImage() {
    const admin = JSON.parse(localStorage.getItem('jwt')).user
    const token = JSON.parse(localStorage.getItem('jwt')).token
    axios.post(`https://atghar-testing.herokuapp.com/api/admin/${admin._id}/product/uploadimage/`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {

        })
        .catch((err) => {
            console.log(err)
        })
}