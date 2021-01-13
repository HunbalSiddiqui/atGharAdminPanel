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
            // Setting product state
            productState = {
                productname: productname.value,
                price: productprice.value,
                featured: featuredFlag.checked,
                category: product.category,
                type: product.type,
                subcategory: product.subcategory
            }
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

// Set image
var productimage = document.querySelector('.product-image')

function getProductImg(productName) {
    axios.get(`https://atghar-testing.herokuapp.com/api/products/photo/${productName}`)
        .then((response) => {
            console.log(
                response.data
            )
            var image = new Image();
            image.id = "pic";
            image.src = "data:image/jpeg;base64," + response.data;
            // image.src = "data:image/png;base64," + System.Convert.ToBase64String(diagram.Diagram);

            // console.log(image)
            // var image = new Image()
            // image.src = `data:image/jpeg;base64,${response.data}`
            // "data:text/plain;base64," + System.Convert.ToBase64String(diagram.Diagram)
            // productimage.style.background = `data:image/png;base64, ${System.Convert.ToBase64String(diagram.Diagram)}`;
            // console.log("Done")
        })
        .catch((err) => {
            console.log(err)
        })
}


// Update product
updateProductBtn.addEventListener('click', () => {
    updateProduct()
})

function updateProduct() {
    loadLoader()
    productState.featured = featuredFlag.checked;
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