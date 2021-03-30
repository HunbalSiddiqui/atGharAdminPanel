var HEROKU_API = 'https://atghar-testing.herokuapp.com/api'
// var API = 'https://www.atghar.com/api'
// var HEROKU_API = 'https://www.atghar.com/api'

function loadLoader() {
    var loader = document.querySelector('.loader')
    loader.style.display = 'block'
}

function closeLoader() {
    var loader = document.querySelector('.loader')
    loader.style.display = 'none'
}
var confirmedTable = document.querySelector('.confirmedTable')

function setConfirmedOrders() {
    loadLoader()
    const admin = JSON.parse(localStorage.getItem('jwt')).user
    const token = JSON.parse(localStorage.getItem('jwt')).token
    axios.get(`${HEROKU_API}/admin/${admin._id}/confirmed`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            closeLoader()
            confirmedTable.innerHTML = ''
            confirmedTable.insertAdjacentHTML('beforeend',
                `
            <tr>
                <th></th>
                <th>Rider Name</th>
                <th>User Name</th>
                <th>Total Amount</th>
                <th></th>
                <th></th>
            </tr>
            `)
            response.data.map((order) => {
                console.log(order,order.userstatus.toLowerCase() === 'being processed')
                return (
                    confirmedTable.insertAdjacentHTML('beforeend',
                        `
                <tr>
                    <th class="flex"><button type="button" onclick="updateOrderStatus('${order._id},cancelled')" class="btn btn-danger" data-toggle="modal">Cancel</button></th>
                    <th class="flex"><button type="button" onclick="updateOrderStatus('${order._id},dispatched')" class="btn btn-warning" data-toggle="modal">Dispatch</button></th>
                    <th class="flex"><button type="button" onclick="updateOrderStatus('${order._id},delivered')" class="btn btn-success" data-toggle="modal">Delivered</button></th>
                    <th>${order.rider.name}</th>
                    <th>${order.user.fullname}</th>
                    <th>${order.amount}-PKR</th>
                    <th class="flex"><button type="button" class="btn btn-info" data-toggle="modal"
                    data-target="#orderdetails" id="${order.name}"   onclick="displayOrderDetails('${order._id}')">View Details</button></th>
                    <th class="flex"><button type="button" class="btn btn-info" data-toggle="modal"
                    data-target="#orderproducts" id="${order.name}"   onclick="displayOrderProducts('${order._id}')">View products</button></th>
                    ${
                        order.hasprescription ?
                        `
                        <th class="flex"><button type="button" class="btn btn-dark" data-toggle="modal"
                        data-target="#orderprescription" id="${order.name}"   onclick="displayPrescription('${order._id}','${order.transaction_id}')">View Prescription</button></th>
                        `
                        :
                        order.userstatus && order.userstatus.toLowerCase() === 'being processed' ?
                        `
                        <th class="flex"><button type="button" onclick="updateOrderStatus('${order._id},confirmed')" class="btn btn-dark" data-toggle="modal">Confirm User</button></th>
                        `
                        :
                        `
                        <th class="flex"><button type="button" class="btn btn-dark" data-toggle="modal"
                        data-target="#orderprescription" id="${order.name}"   onclick="updateOrderStatus('${order._id},confirmed')" disabled>Confirmed User</button></th>
                        `
                    }
                </tr>
                `)
                )

            })
        })
        .catch((err) => {
            console.log(err)
        })
}
setConfirmedOrders()

// DeliveredOrders, Dispatched
var dispatchedTable = document.querySelector('.dispatchedTable')

function setDispatchedOrders() {
    loadLoader()
    const admin = JSON.parse(localStorage.getItem('jwt')).user
    const token = JSON.parse(localStorage.getItem('jwt')).token
    axios.get(`${HEROKU_API}/admin/${admin._id}/dispatched`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            closeLoader()
            // console.log(response.data)
            dispatchedTable.innerHTML = ''
            dispatchedTable.insertAdjacentHTML('beforeend',
                `
            <tr>
                <th></th>
                <th>Rider Name</th>
                <th>User Name</th>
                <th>Total Amount</th>
                <th></th>
                <th></th>
            </tr>
            `)
            response.data.map((order) => {
                return (
                    dispatchedTable.insertAdjacentHTML('beforeend',
                        `
                <tr>
                    <th class="flex"><button type="button" onclick="updateOrderStatus('${order._id},cancelled')" class="btn btn-danger" data-toggle="modal">Cancel</button></th>
                    <th class="flex"><button type="button" onclick="updateOrderStatus('${order._id},delivered')" class="btn btn-success" data-toggle="modal">Delivered</button></th>
                    <th>${order.rider.name}</th>
                    <th>${order.user.fullname}</th>
                    <th>${order.amount}-PKR</th>
                    <th class="flex"><button type="button" class="btn btn-info" data-toggle="modal"
                    data-target="#orderdetails" id="${order.name}"   onclick="displayOrderDetails('${order._id}')">View Details</button></th>
                    <th class="flex"><button type="button" class="btn btn-info" data-toggle="modal"
                    data-target="#orderproducts" id="${order.name}"   onclick="displayOrderProducts('${order._id}')">View products</button></th>
                </tr>
                `)
                )

            })

        })
        .catch((err) => {
            console.log(err)
        })
}

setDispatchedOrders()

// Shipped Orders, Delivered
var shippedTable = document.querySelector('.shippedTable')

function setShippedOrders() {
    loadLoader()
    const admin = JSON.parse(localStorage.getItem('jwt')).user
    const token = JSON.parse(localStorage.getItem('jwt')).token
    axios.get(`${HEROKU_API}/admin/${admin._id}/delivered`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            closeLoader()
            shippedTable.innerHTML = ''
            shippedTable.insertAdjacentHTML('beforeend',
                `
        <tr>
            <th></th>
            <th>Rider Name</th>
            <th>User Name</th>
            <th>Total Amount</th>
            <th>Total Profit</th>
            <th></th>
            <th></th>
        </tr>
        `)
            response.data.map(async (order) => {
                let profit = await calculateProfit(order)
                // console.log('rider',order.rider.name,'user',order.user.fullname)
                // console.log('profit',profit)
                // console.log(profit)
                return (
                    shippedTable.insertAdjacentHTML('beforeend',
                        `
                <tr>
                    <th></th>
                    <th>${order.rider.name}</th>
                    <th>${order.user.fullname}</th>
                    <th>${order.amount}-PKR</th>
                    <th>${profit}-PKR</th>
                    <th class="flex"><button type="button" class="btn btn-info" data-toggle="modal"
                    data-target="#orderdetails" id="${order.name}"   onclick="displayOrderDetails('${order._id}')">View Details</button></th>
                    <th class="flex"><button type="button" class="btn btn-info" data-toggle="modal"
                    data-target="#orderproducts" id="${order.name}"   onclick="displayOrderProducts('${order._id}')">View products</button></th>
                </tr>
                `)
                )

            })
        })
        .catch((err) => {
            console.log(err)
        })
}

setShippedOrders()

const calculateProfit = async (order) => {
    // console.log(order)
    const totalAmount = order.amount;
    const products = order.products
    var totalCostPrice = 0
    var profit = 0;
    products.forEach(product => {
        if (product.type.toLowerCase() === 'grocery') {
            // console.log(product)
            // console.log('product.cp',product.cp)
            totalCostPrice += (product.cp * product.qt)
        } else if (product.type.toLowerCase() === 'pharmacy') {
            totalCostPrice += (product.cp * product.qt)
        }
    });
    // profit = totalAmount-totalCostPrice
    // console.log('totalAmount',totalAmount,'totalCostPrice',totalCostPrice)
    profit = totalAmount - totalCostPrice - order.delivery
    return profit
}

// CancelledOrders
var cancelledTable = document.querySelector('.cancelledTable')

function setCancelledOrders() {
    loadLoader()
    const admin = JSON.parse(localStorage.getItem('jwt')).user
    const token = JSON.parse(localStorage.getItem('jwt')).token
    axios.get(`${HEROKU_API}/admin/${admin._id}/cancelled`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            closeLoader()
            // console.log(response.data)
            cancelledTable.innerHTML = ''
            cancelledTable.insertAdjacentHTML('beforeend',
                `
        <tr>
            <th></th>
            <th>Status</th>
            <th>User Name</th>
            <th>Total Amount</th>
            <th></th>
            <th></th>
        </tr>
        `)
            response.data.map((order) => {
                return (
                    cancelledTable.insertAdjacentHTML('beforeend',
                        `
                <tr>
                    <th></th>
                    <th>${order.status}</th>
                    <th>${order.user.fullname}</th>
                    <th>${order.amount}-PKR</th>
                    <th class="flex"><button type="button" class="btn btn-info" data-toggle="modal"
                    data-target="#orderdetails" id="${order.name}"   onclick="displayOrderDetails('${order._id}')">View Details</button></th>
                    <th class="flex"><button type="button" class="btn btn-info" data-toggle="modal"
                    data-target="#orderproducts" id="${order.name}"   onclick="displayOrderProducts('${order._id}')">View products</button></th>
                </tr>
                `)
                )

            })
        })
        .catch((err) => {
            console.log(err)
        })
}

setCancelledOrders()



// Products popup
const orderProducts = document.querySelector('.orderProducts')

function displayOrderProducts(orderId) {
    // console.log(orderId)
    orderProducts.innerHTML = ''
    loadLoader()
    const admin = JSON.parse(localStorage.getItem('jwt')).user
    const token = JSON.parse(localStorage.getItem('jwt')).token
    axios.get(`${HEROKU_API}/order/${orderId}/admin/${admin._id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            closeLoader()
            response.data.products.map((product) => {
                return (
                    orderProducts.insertAdjacentHTML('beforeend',
                        `
                <div class="alert alert-dark flex-col product-bar" role="alert">
                  <p>ProductName : ${product.productname}</p>
                  <p>Quantity : ${product.qt}</p>
                  <p>Price : ${product.price}</p>
                  <button type="button" class="btn btn-danger" onclick="removeProductFromOrder('${product._id},${orderId},${product.price}')">Remove</button>
                </div>
                `)
                )
            })
        })
        .catch((err) => {
            console.log(err)
        })
}

// Order Details popup
const orderDetails = document.querySelector('.orderDetails')

function displayOrderDetails(orderId) {
    // console.log(orderId)
    orderDetails.innerHTML = ''
    loadLoader()
    const admin = JSON.parse(localStorage.getItem('jwt')).user
    const token = JSON.parse(localStorage.getItem('jwt')).token
    axios.get(`${HEROKU_API}/order/${orderId}/admin/${admin._id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            const details = response.data
            orderDetails.insertAdjacentHTML('beforeend',
                `
            <div class="alert alert-dark flex-col details-box" role="alert">
                <p>TotalAmount: ${details.amount}</p>
                <p>Sub-total: ${details.subtotal}</p>
                <p>Delivery: ${details.delivery}</p>
                <p>UserPhone: ${details.user.phone}</p>
                <p>UserEmail: ${details.user.email}</p>
                <p>UserAddress: ${details.user.address}</p>
                <p>SpecialInstructions: ${details.specialInstruction}</p>
            </div>
            `)
            closeLoader()
        })
        .catch((err) => {
            console.log(err)
        })
}


function updateOrderStatus(statusObj) {
    const splitting = statusObj.split(',')
    const orderId = splitting[0]
    const statusL = splitting[1]
    const token = JSON.parse(localStorage.getItem('jwt')).token
    const admin = JSON.parse(localStorage.getItem('jwt')).user
    // console.log(statusL)
    axios.put(`${HEROKU_API}/order/${orderId}/changestatus/admin/${admin._id}`, {
            status: statusL,
            userstatus: statusL
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            location.reload()
        })
        .catch((err) => {
            console.log(err)
        })
}


// Prescription popup

const orderPrescripition = document.querySelector('#orderPrescripitionDiv')

async function displayPrescription(orderId, transaction_id) {
    // console.log(orderId, transaction_id)
    orderPrescripition.innerHTML = ''
    loadLoader()
    const admin = JSON.parse(localStorage.getItem('jwt')).user
    const token = JSON.parse(localStorage.getItem('jwt')).token
    const response1 = await axios.get(`${HEROKU_API}/admin/${admin._id}/prescription/getfilename/${transaction_id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    const imagesNames = response1.data
    var response2;
    imagesNames.forEach(async imageName => {
        response2 = await axios.get(`${HEROKU_API}/admin/${admin._id}/prescription/show/${transaction_id}/${imageName}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }  
        })
        closeLoader()
        orderPrescripition.insertAdjacentHTML('beforeend',
        `
            <div class="prescription-image-box" style="background-image:url(data:image/jpeg;base64,${response2.data});background-size: 100% 100%,cover;"></div>

        `)
    });

}


// RemoveProduct
function removeProductFromOrder(compound) {
    // TODO: amount calc bug for discount is remaining.
    loadLoader()
    const splitting = compound.split(',')
    const productToBeRemovedId = splitting[0]
    const orderId = splitting[1]
    const productToBeRemovedPrice = splitting[2]
    // Fetching order
    const admin = JSON.parse(localStorage.getItem('jwt')).user
    const token = JSON.parse(localStorage.getItem('jwt')).token
    axios.get(`${HEROKU_API}/order/${orderId}/admin/${admin._id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            const order = response.data
            // console.log(order)
            var orignalAmountWithDiscount = order.delivery //init to discount i.e 100
            order.products.forEach(product => {
                orignalAmountWithDiscount = orignalAmountWithDiscount + (product.price * product.qt) // getting price products qwise
            });
            var discountinPercentage = ((order.discount) * 100) / (orignalAmountWithDiscount - order.delivery); // calculating % is percentage
            const result = order.products.filter(product => product._id !== productToBeRemovedId); // removing choosen product
            // new amount for recalculating after removal of product i.e new array 
            var amount = order.delivery //init to delivery price
            result.forEach(product => {
                amount = amount + (product.price * product.qt)
            });
            var newDiscountinPrice = ((amount - order.delivery) * discountinPercentage) / 100 // calculating new discount in price after new priducts arr
            const newOrderObject = {
                amount: amount - newDiscountinPrice, //delivery price was already set during init
                subtotal: amount - order.delivery - newDiscountinPrice, // subtotal only contains product wise amounts
                delivery: order.delivery, // same  
                user: order.user, // same
                products: result, // setting new products arr
                discount: newDiscountinPrice // updated discount in price
            }
            // console.log(newOrderObject)
            updateOrder(newOrderObject, orderId)
        })
        .catch((err) => {
            console.log(err)
        })
}

function updateOrder(orderObj, orderId) {
    if (orderObj.amount <= 100) {
        alert("Can not remove more products. Please cancel the order instead.")
        closeLoader()
    } else {
        const admin = JSON.parse(localStorage.getItem('jwt')).user
        const token = JSON.parse(localStorage.getItem('jwt')).token
        axios.put(`${HEROKU_API}/order/${orderId}/updateorderadmin/${admin._id}`,
                orderObj, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            .then((response) => {
                closeLoader()
                location.reload()
            })
            .catch((err) => {
                console.log(err)
            })
    }
}