function loadLoader() {
    var loader = document.querySelector('.loader')
    loader.style.display = 'block'
}

function closeLoader() {
    var loader = document.querySelector('.loader')
    loader.style.display = 'none'
}
var productsearcbar = document.querySelector('.productsearcbar')
var suggestionBox = document.querySelector('.suggestionBox')
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
                <div class="suggestionBox-product-item f1-5 flex-start" onclick="getProductDetails('${product._id}')">
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

// Set details
var productname = document.querySelector('.productname')
var productprice = document.querySelector('.productprice')
var featuredFlag = document.querySelector('.featuredFlag')
var producttype = document.querySelector('.producttype')
var productCategory = document.querySelector('.productCategory')
var productsubCategory = document.querySelector('.productsubCategory')
var productedit = document.querySelector('.product-edit')

function getProductDetails(productId) {

    productedit.style.display = "grid"
    loadLoader()
    // console.log(productId)
    // Close suggestion box on click
    productsearcbar.value = ""
    searchFunction()
    axios.get(`https://atghar-testing.herokuapp.com/api/product/${productId}`)
        .then((response) => {
            const product = response.data
            getProductImg(product.productname)
            closeLoader()
            productname.value = product.productname
            productprice.value = product.price
            product.featured ?
                featuredFlag.checked = true :
                featuredFlag.checked = false
            producttype.value = product.type
            productCategory.value = product.category
            productsubCategory.value = product.subcategory
        })
        .catch((err) => {
            console.log(err)
        })
}

// Set image
var productimage = document.querySelector('.product-image')

function getProductImg(productName) {
    axios.get(`https://atghar-testing.herokuapp.com/api/products/photo/${productName}`)
        .then((response) => {
            // console.log(
            //     response.data
            // )
            var image = new Image();
            image.id = "pic";
            image.src = response.data.toDataURL();
            console.log(image)
            // var image = new Image()
            // image.src = `data:image/jpeg;base64,${response.data}`
            // productimage.style.background = myImage
            // console.log("Done")
        })
        .catch((err) => {
            console.log(err)
        })
}