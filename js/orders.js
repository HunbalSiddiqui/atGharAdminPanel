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
    axios.get(`https://atghar-testing.herokuapp.com/api/admin/${admin._id}/confirmed`, {
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
                // console.log(order)
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
    axios.get(`https://atghar-testing.herokuapp.com/api/admin/${admin._id}/dispatched`, {
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
    axios.get(`https://atghar-testing.herokuapp.com/api/admin/${admin._id}/delivered`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            closeLoader()
            // console.log(response.data)
            shippedTable.innerHTML = ''
            shippedTable.insertAdjacentHTML('beforeend',
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
                    shippedTable.insertAdjacentHTML('beforeend',
                        `
                <tr>
                    <th></th>
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

setShippedOrders()


// CancelledOrders
var cancelledTable = document.querySelector('.cancelledTable')

function setCancelledOrders() {
    loadLoader()
    const admin = JSON.parse(localStorage.getItem('jwt')).user
    const token = JSON.parse(localStorage.getItem('jwt')).token
    axios.get(`https://atghar-testing.herokuapp.com/api/admin/${admin._id}/cancelled`, {
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
            <th>Rider Name</th>
            <th>User Name</th>
            <th>Total Amount</th>
            <th></th>
            <th></th>
        </tr>
        `)
            response.data.map((order) => {
                // console.log(order)
                return (
                    cancelledTable.insertAdjacentHTML('beforeend',
                        `
                <tr>
                    <th></th>
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

setCancelledOrders()



// Products popup
const orderProducts = document.querySelector('.orderProducts')

function displayOrderProducts(orderId) {
    // console.log(orderId)
    orderProducts.innerHTML = ''
    loadLoader()
    const admin = JSON.parse(localStorage.getItem('jwt')).user
    const token = JSON.parse(localStorage.getItem('jwt')).token
    axios.get(`https://atghar-testing.herokuapp.com/api/order/${orderId}/admin/${admin._id}`, {
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
    axios.get(`https://atghar-testing.herokuapp.com/api/order/${orderId}/admin/${admin._id}`, {
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


function updateOrderStatus(statusObj){
    const splitting = statusObj.split(',')
    const orderId = splitting[0]
    const statusL = splitting[1]
    const token = JSON.parse(localStorage.getItem('jwt')).token
    const admin = JSON.parse(localStorage.getItem('jwt')).user
    // console.log(statusL)
    axios.put(`https://atghar-testing.herokuapp.com/api/order/${orderId}/changestatus/admin/${admin._id}`,{
        status : statusL
    },{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    .then((response)=>{
        location.reload()
    })
    .catch((err)=>{
        console.log(err)
    })
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
    axios.get(`https://atghar-testing.herokuapp.com/api/order/${orderId}/admin/${admin._id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            const order = response.data
            console.log(order)
            const result = order.products.filter(product => product._id !== productToBeRemovedId);
            var amount = order.delivery
            result.forEach(product => {
                amount = amount + (product.price * product.qt)
            });
            const newOrderObject = {
                amount: amount-order.discount+order.delivery,
                subtotal: amount - order.delivery-order.discount,
                delivery: order.delivery,
                user: order.user,
                products: result,
                discoount:order.discount
            }
            console.log(newOrderObject)
            // updateOrder(newOrderObject, orderId)
        })
        .catch((err) => {
            console.log(err)
        })
}

function updateOrder(orderObj, orderId) {
    // console.log(orderId)
    const admin = JSON.parse(localStorage.getItem('jwt')).user
    const token = JSON.parse(localStorage.getItem('jwt')).token
    axios.put(`https://atghar-testing.herokuapp.com/api/order/${orderId}/updateorderadmin/${admin._id}`,
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