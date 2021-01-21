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
var updateProductBtn = document.querySelector('.updateProductBtn')

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
var productState = {}
var productid = null

function getProductDetails(productId) {
    loadLoader()
    // console.log(productId)
    // Close suggestion box on click
    productsearcbar.value = ""
    searchFunction()
    axios.get(`https://atghar-testing.herokuapp.com/api/product/${productId}`)
        .then((response) => {
            productedit.style.display = "grid"
            const product = response.data
            closeLoader()
            productid = product._id
            productname.value = product.productname
            productprice.value = product.price
            product.featured ?
                featuredFlag.checked = true :
                featuredFlag.checked = false
            producttype.value = product.type
            productCategory.value = product.category
            productsubCategory.value = product.subcategory
            getProductImg(productname.value)
        })
        .catch((err) => {
            console.log(err)
        })
}


function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah')
                .attr('src', e.target.result)
                .width("100%")
                .height("100%");
        };

        reader.readAsDataURL(input.files[0]);
    }
}


var productimage = document.querySelector('.product-img')

function getProductImg(productName) {

    const token = JSON.parse(localStorage.getItem('jwt')).token
    axios.get(`https://atghar-testing.herokuapp.com/api/admin/photo/${productName}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            // productimage.style.background = `url(data:image/jpeg;base64,${response.data})`
            productimage.insertAdjacentHTML(`beforeend`,
                `
        <img class="w100h80" src="data:image/jpeg;base64,${response.data}"/>
        `)
        })
        .catch((err) => {
            productimage.style.background = `https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png`
            console.log(err)
        })
}


// Update product
updateProductBtn.addEventListener('click', () => {
    updateProduct()
})

function updateProduct() {
    loadLoader()
    // Setting product state
    productState = {
        productname: productname.value,
        price: productprice.value,
        featured: featuredFlag.checked,
        category: productCategory.value,
        type: producttype.value,
        subcategory: productsubCategory.value
    }
    if (productid) {
        const admin = JSON.parse(localStorage.getItem('jwt')).user
        const token = JSON.parse(localStorage.getItem('jwt')).token
        axios.put(`https://atghar-testing.herokuapp.com/api/admin/${admin._id}/product/${productid}`,
                productState, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            .then((response) => {
                closeLoader()
                console.log(response.data)
            })
            .catch((err) => {
                console.log(err)
            })

    }
}

// Delete
const removeproduct = document.querySelector('.removeproduct')
removeproduct.addEventListener('click',()=>{
    deleteProduct()
})
function deleteProduct() {
    loadLoader()
    const token = JSON.parse(localStorage.getItem('jwt')).token
    const admin = JSON.parse(localStorage.getItem('jwt')).user
    axios.delete(`https://atghar-testing.herokuapp.com/api/admin/${admin._id}/product/${productid}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            location.reload()
        })
        .catch((err) => {
            loadLoader()
            console.log(err)
        })
}