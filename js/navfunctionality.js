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
var productType = document.querySelector('.new-producttype')
var productsubcategoryDiv = document.querySelector('.productsubcategoryDiv') // whole div
var pharmacyProductFormDiv = document.querySelector('.pharmacyProductFormDiv') // PharmacyProduct Form i.e pack/strips
var pharmacyDiv = document.querySelectorAll('.pharmacyDiv') // all pharmacy specific div
pharmacyDiv.forEach(element => {
    element.style.display = 'none' // hiding all the div by default. in case of grocery this will remain same, in case of pharmacy product this will be altered
});
var costprice = document.querySelector('.new-costprice') // for pharmacy
var costPriceStrip = document.querySelector('.new-costPriceStrip') // for pharmacy 
var mrp = document.querySelector('.new-mrp') // for pharmacy
var mrpStrip = document.querySelector('.new-mrpStrip') // for pharmacy
var priceStrip = document.querySelector('.new-priceStrip') // for pharmacy
var usedFor = document.querySelector('.new-usedFor') // for pharmacy
var vendor = document.querySelector('.new-vendor') // for pharmacy
var company = document.querySelector('.new-company') // for pharmacy
productType.addEventListener('change', () => {
    if (productType.value.toLowerCase() === 'pharmacy') {
        productsubcategoryDiv.style.display = 'none' // sub category div
        pharmacyDiv.forEach(element => {
            element.style.display = 'flex' // hiding all the div by default. in case of grocery this will remain same, in case of pharmacy product this will be altered
        });
        // pharmacyProductFormDiv.style.display = 'flex'
    } else if (productType.value.toLowerCase() === 'grocery'){
        productsubcategoryDiv.style.display = 'flex' // sub category div
        // pharmacyProductFormDiv.style.display = 'none'
        pharmacyDiv.forEach(element => {
            element.style.display = 'none' // hiding all the div by default. in case of grocery this will remain same, in case of pharmacy product this will be altered
        });
    }
    displayCategories(productType.value)
})
var productcategory = document.querySelector('.new-productcategory')
// Cateogries
function displayCategories(type) {
    // Grocery
    if (productcategory) {
        productcategory.innerHTML = ''
        productcategory.insertAdjacentHTML('beforeend',
            `
        <option selected>Choose</option>
        
        `)
        if (type.toLowerCase() === 'grocery') {
            // Grocery
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
        } else {
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
}
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
var productsubcategory = document.querySelector('.new-productsubcategory') // for grocery
var productcategory = document.querySelector('.new-productcategory') // for both
var newproductname = document.querySelector('.new-productname') // for both
var newproductprice = document.querySelector('.new-productprice') // for both
var newproducttype = document.querySelector('.new-producttype') // for both
var featuredFlag = document.querySelector('.new-featuredFlag') // for both
// var packForm = document.querySelector('.packForm') // for pharmacy
// var stripForm = document.querySelector('.stripForm') // for pharmacy

var productObj = {}
var createProductBtn = document.querySelector('.createProductBtn')
createProductBtn.addEventListener('click', () => {
    if (productType.value.toLowerCase() === 'grocery') {
        productObj = {
            productname: newproductname.value,
            price: newproductprice.value,
            type: newproducttype.value,
            category: productcategory.value,
            subcategory: productsubcategory.value,
            featured: featuredFlag.checked
        }
    } else if (productType.value.toLowerCase() === 'pharmacy') {
        // let localVarForForm = null
        // if (packForm.checked)
        //     localVarForForm = 'pack'
        // else if(stripForm.checked)
        //     localVarForForm = 'strips'
        productObj = {
            productname: newproductname.value,
            price: newproductprice.value,
            type: newproducttype.value,
            category: productcategory.value,
            featured: featuredFlag.checked,
            
        }
    }
    createProduct(productObj)
})

function createProduct(productDetails) {
    loadLoader()
    const admin = JSON.parse(localStorage.getItem('jwt')).user
    const token = JSON.parse(localStorage.getItem('jwt')).token
    console.log(productDetails)
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
            uploadProductImage()
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
    const formData = new FormData()
    formData.append('file', productimg.files[0]);
    formData.append('name', productimg.files[0].name);
    console.log(formData)
    axios.post(`https://atghar-testing.herokuapp.com/api/admin/${admin._id}/product/uploadimage/`,
            formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
        .then((response) => {
            console.log(response)
            closeLoader()
            location.reload()
        })
        .catch((err) => {
            console.log(err)
        })
}