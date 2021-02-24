const orderId = window.location.hash.split('#')[1]
if(!orderId||orderId===undefined)
    location.assign('./riderDashboard.html')
function loadLoader() {
    var loader = document.querySelector('.loader')
    loader.style.display = 'block'
}

function closeLoader() {
    var loader = document.querySelector('.loader')
    loader.style.display = 'none'
}
var riderdashboardBtn = document.querySelector('.riderdashboardBtn')
riderdashboardBtn.addEventListener('click',()=>{
    location.assign('./riderDashboard.html')
})
var refreshBtn = document.querySelector('.refreshBtn')
refreshBtn.addEventListener('click', () => {
    loadLoader()
    location.reload()
})

var signoutBtn = document.querySelector('.signoutBtn')

signoutBtn.addEventListener('click', () => {
    signoutRider(() => {
        location.assign('../index.html')
    })
})

function signoutRider(next) {
    loadLoader()
    const token = JSON.parse(localStorage.getItem('jwt')).token
    const rider = JSON.parse(localStorage.getItem('jwt')).user
    axios.get(`https://atghar-testing.herokuapp.com/api/rider/signout/`, {
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
            localStorage.removeItem("jwt")
            next(); //we can have a debate on wether to keep it here or at the end.
        })
}

var contentOrderProducts = document.querySelector('.content-order-products')
let productDetails = {} // fetched product details will be saved in this global variable
function getOrderDetails () {
    contentOrderProducts.innerHTML = ''
    loadLoader()
    const rider = JSON.parse(localStorage.getItem('jwt')).user
    const token = JSON.parse(localStorage.getItem('jwt')).token
    axios.get(`https://atghar-testing.herokuapp.com/api/order/${orderId}/rider/${rider._id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then((response)=>{
        productDetails = response.data
        
        closeLoader()
        contentOrderProducts.insertAdjacentHTML('beforeend',
        `
        <div class="total-amount-bar fb">
        <p>TotalAmount: Rs. ${response.data.amount}</p>
        </div>
        `)
        var products = response.data.products
        products.map((product)=>{
            return(
                contentOrderProducts.insertAdjacentHTML('beforeend',
                `
                <div class="order-products-display-bar">
                <p>Name: ${product.productname}</p>
                <p>Type: ${product.type}</p>
                <p>Category: ${product.category}</p>
                <p>Price: ${product.price}</p>
                <p>Qt: ${product.qt}</p>
                </div>
                `)
            )
        })
    })
    .catch((err)=>{
        console.log(err)
    })
}
getOrderDetails()

// Search product
var productsearcbar = document.querySelector('.productsearcbar')
var suggestionBox = document.querySelector('.suggestionBox2')
var forminput = ""
productsearcbar.addEventListener('keyup', async () => {
    searchFunction()
})

function searchFunction() {
    forminput = productsearcbar.value
    if (forminput !== "") {
        suggestionBox.style.display = 'flex'
        fetchSearchProducts()
    } else if (forminput === "") {
        suggestionBox.style.display = 'none'
    }
}

function fetchSearchProducts() {
    axios.get(`https://atghar-testing.herokuapp.com/api//products/search?search=${forminput}&category=All`)
        .then((response) => {
            suggestionBox.innerHTML = ''
            response.data.map((product) => {
                return (
                    suggestionBox.insertAdjacentHTML('beforeend',
                        `
                <div class="suggestionBox2-product-item f1-5 flex-start" onclick="getProductDetails('${product._id}')">
                ${product.productname}
                </div>
                `)
                )
            })

        })
        .catch((err) => {
            console.log(err)
        })
}

// displaying selected product from search.
var productname = document.querySelector('.productname')
var productprice = document.querySelector('.productprice')
var featuredFlag = document.querySelector('.featuredFlag')
var producttype = document.querySelector('.producttype')
var productCategory = document.querySelector('.productCategory')
var productsubCategory = document.querySelector('.productsubCategory')
var contentOrderAddProductsDetails = document.querySelector('.content-order-add-products-details')
var productState = {}
var productid = null
var pharmacyDiv = document.querySelectorAll('.pharmacyDiv') // all pharmacy specific div
pharmacyDiv.forEach(element => {
    element.style.display = 'none' // hiding all the div by default. in case of grocery this will remain same, in case of pharmacy product this will be altered
});
var costPrice = document.querySelector('.costPrice')
// pharmacy div
var costPriceStrip = document.querySelector('.costPriceStrip')
var mrp = document.querySelector('.mrp')
var mrpStrip = document.querySelector('.mrpStrip')
var priceStrip = document.querySelector('.priceStrip')
var usedFor = document.querySelector('.usedFor')
var vendor = document.querySelector('.vendor')
var company = document.querySelector('.company')
var discount = document.querySelector('.discount') // for pharmacy
var formula = document.querySelector('.formula') // for pharmacy
var packSize = document.querySelector('.packSize') // for pharmacy
var strips = document.querySelector('.strips') // for pharmacy
var tabPerStrip = document.querySelector('.tabletsPerStrip') // for pharmacy
var prescription = document.querySelector('.prescription') // for pharmacy
var deliverytime = document.querySelector('.deliverytime') // for both
var addQuantity = document.querySelector('.addQuantity') // for both
var medicineForm = document.querySelector('.medicineForm') // for pharmacy

let searchedProductDetails = {}
function getProductDetails(productId) {
    loadLoader()
    // console.log(productId)
    // Close suggestion box on click
    productsearcbar.value = ""
    searchFunction()
    axios.get(`https://atghar-testing.herokuapp.com/api/product/${productId}`)
        .then((response) => {
            contentOrderAddProductsDetails.style.display = "block"
            const product = response.data
            searchedProductDetails = product
            closeLoader()
            if (product.type.toLowerCase() === 'grocery') {
                productsubCategory.value = product.subcategory
            } else if (product.type.toLowerCase() === 'pharmacy') {
                productsubCategory.value = 'none'
                pharmacyDiv.forEach(element => {
                    element.style.display = 'flex' // displaying all pharmacy specific div
                });
                costPriceStrip.value = product.cpStrip
                mrp.value = product.mrp
                mrpStrip.value = product.mrpStrip
                priceStrip.value = product.priceStrip
                usedFor.value = product.usedfor
                vendor.value = product.vendor
                company.value = product.company
                discount.value = product.discount
                formula.value = product.formula
                packSize.value = product.packsize
                strips.value = product.strips
                tabPerStrip.value = product.tabletsperstrip
                prescription.value = product.prescription
            }
            productid = product._id
            productname.value = product.productname
            productprice.value = product.price
            costPrice.value = product.cp
            product.featured ?
                featuredFlag.checked = true :
                featuredFlag.checked = false
            producttype.value = product.type
            productCategory.value = product.category
            deliverytime.value = product.deliverytime
            // getProductImg(productname.value)
        })
        .catch((err) => {
            console.log(err)
        })
}

// add to order
var addToOrderBtn = document.querySelector('.addToOrderBtn')

addToOrderBtn.addEventListener('click',()=>{
    let updatedProductsArr=[]
    let oldProductsArr = productDetails.products
    if(searchedProductDetails.type.toLowerCase()==='grocery')
    {
        updatedProductsArr  = [...productDetails.products,{
            category: searchedProductDetails.category,
            productname: searchedProductDetails.productname,
            price: searchedProductDetails.price,
            _id: searchedProductDetails._id,
            qt: addQuantity,
            vendor: searchedProductDetails.vendor,
            type: searchedProductDetails.type,
            subcategory: searchedProductDetails.subcategory,
            cp: searchedProductDetails.cp
        }]
    }
    else if(searchedProductDetails.type.toLowerCase()==='pharmacy')
    {
        updatedProductsArr = [...productDetails.products,{
            category: searchedProductDetails.category,
            productname: searchedProductDetails.productname,
            price: searchedProductDetails.price,
            _id: searchedProductDetails._id,
            qt: addQuantity.value,
            vendor: searchedProductDetails.vendor,
            type: searchedProductDetails.type,
            cp: searchedProductDetails.cp,
            isStrip: medicineForm.value.toLowerCase()==='strip' ?true:false // TODO : craete a radio button than check if pack is selected or strip is selected than set isStrip accordingly.
        }]
    }
    // updating productDetails Object, this object will than be passed to the API
    productDetails.products = updatedProductsArr
    calculateUpdatedAmount(oldProductsArr,productDetails)
    // AddProductAndUpdateOrder()
})

const calculateUpdatedAmount = (oldProductsArr,productDetails) => {
    var orignalAmountWithDiscount = productDetails.delivery //init to discount i.e 100
    oldProductsArr.forEach(product => {
        orignalAmountWithDiscount = orignalAmountWithDiscount + (product.price * product.qt) // getting price products wise
    });
    var discountinPercentage = ((productDetails.discount)*100)/(orignalAmountWithDiscount-productDetails.delivery); // calculating % is percentage
    var amount = productDetails.delivery //init to delivery price
    productDetails.products.forEach(product => { // productDetails.product has been updated in the add event listener of btn
        amount = amount + (product.price * product.qt)
    });
    var newDiscountinPrice = ((amount-productDetails.delivery)*discountinPercentage)/100 // calculating new discount in price after new priducts arr
    const newOrderObject = {
        amount: amount-newDiscountinPrice,//delivery price was already set during init
        subtotal: amount - productDetails.delivery-newDiscountinPrice, // subtotal only contains product wise amounts
        delivery: productDetails.delivery, // same  
        user: productDetails.user, // same
        products: productDetails.products, // setting new products arr
        discount: newDiscountinPrice // updated discount in price
    }
    AddProductAndUpdateOrder(newOrderObject,productDetails._id)
    
}

function AddProductAndUpdateOrder(orderObj,orderId){
    const rider = JSON.parse(localStorage.getItem('jwt')).user
    const token = JSON.parse(localStorage.getItem('jwt')).token
    axios.put(`https://atghar-testing.herokuapp.com/api/order/${orderId}/updateorderrider/${rider._id}`,orderObj,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    .then((response)=>{
        location.reload()
    })
    .catch((err)=>{
        alert("Unable To Add Product",err)
    })
    
}