function loadLoader() {
    var loader = document.querySelector('.loader')
    loader.style.display = 'block'
}

function closeLoader() {
    var loader = document.querySelector('.loader')
    loader.style.display = 'none'
}
const orderId = window.location.hash.split('#')[1]
var contentOrderProducts = document.querySelector('.content-order-products')
function getOrderDetails () {
    loadLoader()
    const admin = JSON.parse(localStorage.getItem('jwt')).user
    const token = JSON.parse(localStorage.getItem('jwt')).token
    axios.get(`https://atghar-testing.herokuapp.com/api/order/${orderId}/admin/${admin._id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then((response)=>{
        closeLoader()
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