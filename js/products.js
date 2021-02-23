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
            // console.log(response)
            productimage.innerHTML = ''
            // productimage.style.background = `url(data:image/jpeg;base64,${response.data})`
                productimage.insertAdjacentHTML(`beforeend`,
                    `
            <img style="width: 100%;height: 50%;" src="data:image/jpeg;base64,${response.data}"/>
            `)
        })
        .catch((err) => {
            productimage.insertAdjacentHTML(`beforeend`,
                `
            <img class="w100h80" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png"/>
            `)
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
    if (producttype.value.toLowerCase() === 'grocery') {
        productState = {
            productname: productname.value,
            price: productprice.value,
            featured: featuredFlag.checked,
            category: productCategory.value,
            type: producttype.value,
            subcategory: productsubCategory.value,
            cp : costPrice.value,
            mrp : mrp.value,
            discount : discount.value,
            vendor : vendor.value,
            deliverytime: deliverytime.value
        }
    } else if (producttype.value.toLowerCase() === 'pharmacy') {
        // TODO : add all the fields in productState which shall be sent while updating.
        productState = {
            productname: productname.value,
            price: productprice.value,
            featured: featuredFlag.checked,
            category: productCategory.value,
            type: producttype.value,
            cp : costPrice.value,
            cpStrip : costPriceStrip.value,  
            mrp : mrp.value,
            mrpStrip : mrpStrip.value,
            priceStrip : priceStrip.value,
            usedfor : usedFor.value,
            vendor : vendor.value,
            company : company.value,
            discount : discount.value,
            packsize : packSize.value,
            strips : strips.value,
            tabletsperstrip : tabPerStrip.value,
            prescription : prescription.value,
            formula : formula.value,
            deliverytime: deliverytime.value
        }
    }

    if (productid) {
        const admin = JSON.parse(localStorage.getItem('jwt')).user
        const token = JSON.parse(localStorage.getItem('jwt')).token
        // console.log(productState)
        axios.put(`https://atghar-testing.herokuapp.com/api/admin/${admin._id}/product/${productid}`,
                productState, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            .then((response) => {
                closeLoader()
                // console.log(response.data)
                location.reload()
            })
            .catch((err) => {
                console.log(err)
            })

    }
}

// Delete
const removeproduct = document.querySelector('.removeproduct')
removeproduct.addEventListener('click', () => {
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