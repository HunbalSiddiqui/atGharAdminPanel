// Verifyin if user is login and has admin controls
if (!localStorage.getItem('jwt')) {
    location.assign('../index.html')
}
if (JSON.parse(localStorage.getItem("jwt")).user.role === 1) {
    // TODO: redirect to required page
}
var message = document.querySelector('.message')
function setWelcomeMessage(){
    const user = JSON.parse(localStorage.getItem('jwt')).user
    message.innerHTML = ''
    message.insertAdjacentHTML('beforeend',
    `
    <h3 class="white f1-5">Welcome ${user.name}</h3>
    `)
}
setWelcomeMessage()

function loadLoader() {
    var loader = document.querySelector('.loader')
    loader.style.display = 'block'
}

function closeLoader() {
    var loader = document.querySelector('.loader')
    loader.style.display = 'none'
}
loadLoader()
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

// Tables
// Cancelled
var cancelledordersTable = document.querySelector('.cancelledordersTable')

function displayCancelledOrders() {
    loadLoader()
    const token = JSON.parse(localStorage.getItem('jwt')).token
    const rider = JSON.parse(localStorage.getItem('jwt')).user
    axios.get(`https://atghar-testing.herokuapp.com/api/rider/${rider._id}/cancelled`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            closeLoader()
            // console.log(response.data)
            cancelledordersTable.innerHTML = ''
            cancelledordersTable.insertAdjacentHTML('beforeend',
                `
        <tr>
            <th></th>
            <th>User Name</th>
            <th>User Phone</th>
            <th>Amount</th>
            <th></th>
        </tr>
        `)

            response.data.map((order) => {
                return (
                    cancelledordersTable.insertAdjacentHTML('beforeend',
                        `
                <tr>
                    <th></th>
                    <th>${order.user.fullname}</th>
                    <th>${order.user.phone}</th>
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
displayCancelledOrders()

// Confirmed
var confirmedordersTable = document.querySelector('.confirmedordersTable')

function displayConfirmedOrders() {
    loadLoader()
    const token = JSON.parse(localStorage.getItem('jwt')).token
    const rider = JSON.parse(localStorage.getItem('jwt')).user
    axios.get(`https://atghar-testing.herokuapp.com/api/rider/${rider._id}/confirmed`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            closeLoader()
            // console.log(response.data)
            confirmedordersTable.innerHTML = ''
            confirmedordersTable.insertAdjacentHTML('beforeend',
                `
        <tr>
            <th></th>
            <th>User Name</th>
            <th>User Phone</th>
            <th>Amount</th>
            <th></th>
        </tr>
        `)

            response.data.map((order) => {
                return (
                    confirmedordersTable.insertAdjacentHTML('beforeend',
                        `
                <tr>
                    <th class="flex"><button type="button" class="btn btn-info" data-toggle="modal"
                    data-target="#orderdetails" id="${order.name}"   onclick="displayOrderDetails('${order._id}')">View Details</button></th>
                    <th class="flex"><button type="button" class="btn btn-info" data-toggle="modal"
                    data-target="#orderproducts" id="${order.name}"   onclick="displayOrderProducts('${order._id}')">View products</button></th>
                    <th>${order.user.fullname}</th>
                    <th>${order.user.phone}</th>
                    <th>${order.amount}-PKR</th>
                    <th class="flex"><button type="button" onclick="updateOrderStatus('${order._id},cancelled')" class="btn btn-danger" data-toggle="modal">Cancel</button></th>
                    <th class="flex"><button type="button" onclick="updateOrderStatus('${order._id},dispatched')" class="btn btn-warning" data-toggle="modal">Dispatch</button></th>
                    <th class="flex"><button type="button" onclick="updateOrderStatus('${order._id},delivered')" class="btn btn-success" data-toggle="modal">Delivered</button></th>
                </tr>
                `)
                )

            })
        })
        .catch((err) => {
            console.log(err)
        })
}
displayConfirmedOrders()

// Delivered
var deliveredordersTable = document.querySelector('.deliveredordersTable')

function displayDeliveredOrders() {
    loadLoader()
    const token = JSON.parse(localStorage.getItem('jwt')).token
    const rider = JSON.parse(localStorage.getItem('jwt')).user
    axios.get(`https://atghar-testing.herokuapp.com/api/rider/${rider._id}/delivered`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            closeLoader()
            // console.log(response.data)
            deliveredordersTable.innerHTML = ''
            deliveredordersTable.insertAdjacentHTML('beforeend',
                `
        <tr>
            <th></th>
            <th>User Name</th>
            <th>User Phone</th>
            <th>Amount</th>
            <th></th>
        </tr>
        `)

            response.data.map((order) => {
                return (
                    deliveredordersTable.insertAdjacentHTML('beforeend',
                        `
                <tr>
                    <th></th>
                    <th>${order.user.fullname}</th>
                    <th>${order.user.phone}</th>
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
displayDeliveredOrders()


// Dispatched
var dispatchedordersTable = document.querySelector('.dispatchedordersTable')

function displayDispatchedOrders() {
    loadLoader()
    const token = JSON.parse(localStorage.getItem('jwt')).token
    const rider = JSON.parse(localStorage.getItem('jwt')).user
    axios.get(`https://atghar-testing.herokuapp.com/api/rider/${rider._id}/dispatched`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            closeLoader()
            // console.log(response.data)
            dispatchedordersTable.innerHTML = ''
            dispatchedordersTable.insertAdjacentHTML('beforeend',
                `
        <tr>
            <th></th>
            <th>User Name</th>
            <th>User Phone</th>
            <th>Amount</th>
            <th></th>
        </tr>
        `)

            response.data.map((order) => {
                return (
                    dispatchedordersTable.insertAdjacentHTML('beforeend',
                        `
                <tr>
                    <th class="flex"><button type="button" class="btn btn-info" data-toggle="modal"
                    data-target="#orderdetails" id="${order.name}"   onclick="displayOrderDetails('${order._id}')">View Details</button></th>
                    <th class="flex"><button type="button" class="btn btn-info" data-toggle="modal"
                    data-target="#orderproducts" id="${order.name}"   onclick="displayOrderProducts('${order._id}')">View products</button></th>
                    <th>${order.user.fullname}</th>
                    <th>${order.user.phone}</th>
                    <th>${order.amount}-PKR</th>
                    <th class="flex"><button type="button" onclick="updateOrderStatus('${order._id},cancelled')" class="btn btn-danger" data-toggle="modal">Cancel</button></th>
                    <th class="flex"><button type="button" onclick="updateOrderStatus('${order._id},delivered')" class="btn btn-success" data-toggle="modal">Delivered</button></th>
                </tr>
                `)
                )

            })
        })
        .catch((err) => {
            console.log(err)
        })
}
displayDispatchedOrders()




// Order functions
// Products popup
const orderProducts = document.querySelector('.orderProducts')

function displayOrderProducts(orderId) {
    // console.log(orderId)
    orderProducts.innerHTML = ''
    loadLoader()
    const rider = JSON.parse(localStorage.getItem('jwt')).user
    const token = JSON.parse(localStorage.getItem('jwt')).token
    axios.get(`https://atghar-testing.herokuapp.com/api/order/${orderId}/rider/${rider._id}`, {
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
                  <button type="button" class="btn btn-danger" onclick="removeProductFromOrder('${product._id},${orderId}')">Remove</button>
                </div>
                `)
                )
            })
        })
        .catch((err) => {
            console.log(err)
        })
}

function updateOrderStatus(statusObj) {
    loadLoader()
    const splitting = statusObj.split(',')
    const orderId = splitting[0]
    const statusL = splitting[1]
    const token = JSON.parse(localStorage.getItem('jwt')).token
    const rider = JSON.parse(localStorage.getItem('jwt')).user
    // console.log(statusL)
    axios.put(`https://atghar-testing.herokuapp.com/api/order/${orderId}/changestatus/rider/${rider._id}`, {
            status: statusL
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
// Order Details popup
const orderDetails = document.querySelector('.orderDetails')

function displayOrderDetails(orderId) {
    // console.log(orderId)
    orderDetails.innerHTML = ''
    loadLoader()
    const rider = JSON.parse(localStorage.getItem('jwt')).user
    const token = JSON.parse(localStorage.getItem('jwt')).token
    axios.get(`https://atghar-testing.herokuapp.com/api/order/${orderId}/rider/${rider._id}`, {
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


// RemoveProduct
function removeProductFromOrder(compound) {
    // TODO: amount calc is remaining.
    loadLoader()
    const splitting = compound.split(',')
    const productToBeRemovedId = splitting[0]
    const orderId = splitting[1]
    // Fetching order
    const rider = JSON.parse(localStorage.getItem('jwt')).user
    const token = JSON.parse(localStorage.getItem('jwt')).token
    axios.get(`https://atghar-testing.herokuapp.com/api/order/${orderId}/rider/${rider._id}`, {
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
            var discountinPercentage = ((order.discount)*100)/(orignalAmountWithDiscount-order.delivery); // calculating % is percentage
            const result = order.products.filter(product => product._id !== productToBeRemovedId); // removing choosen product
            // new amount for recalculating after removal of product i.e new array 
            var amount = order.delivery //init to delivery price
            result.forEach(product => {
                amount = amount + (product.price * product.qt)
            });
            var newDiscountinPrice = ((amount-order.delivery)*discountinPercentage)/100 // calculating new discount in price after new priducts arr
            const newOrderObject = {
                amount: amount-newDiscountinPrice,//delivery price was already set during init
                subtotal: amount - order.delivery-newDiscountinPrice, // subtotal only contains product wise amounts
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
    if(orderObj.amount <= 100)
    {
        alert("Can not remove more products. Please cancel the order instead.")
        closeLoader()
    }
    else{
        const rider = JSON.parse(localStorage.getItem('jwt')).user
        const token = JSON.parse(localStorage.getItem('jwt')).token
        axios.put(`https://atghar-testing.herokuapp.com/api/order/${orderId}/updateorderrider/${rider._id}`,
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