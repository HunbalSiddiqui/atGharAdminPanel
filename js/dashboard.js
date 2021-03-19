var HEROKU_API = 'https://atghar-testing.herokuapp.com/api'
var API = 'https://www.atghar.com/api'

function loadLoader() {
    var loader = document.querySelector('.loader')
    loader.style.display = 'block'
}

function closeLoader() {
    var loader = document.querySelector('.loader')
    loader.style.display = 'none'
}

var pendingOrderscount = document.querySelector('.pendingOrderscount')

function setpendingOrderscount() {
    const token = JSON.parse(localStorage.getItem("jwt")).token
    const admin = JSON.parse(localStorage.getItem("jwt")).user
    axios.get(`${HEROKU_API}/portal/admin/${admin._id}/totalorders/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(response.data,response.data.length === 0)
            if (pendingOrderscount && response.data,response.data.length !== 0) {
                pendingOrderscount.innerHTML = ''
                pendingOrderscount.insertAdjacentHTML('afterbegin',
                    `
            ${response.data}
            `)
            }
        })
        .catch((err) => {
            console.log(err)
        })
}
setpendingOrderscount()

var usercount = document.querySelector('.usercount')

function setUserCount() {
    const token = JSON.parse(localStorage.getItem("jwt")).token
    const admin = JSON.parse(localStorage.getItem("jwt")).user
    axios.get(`${HEROKU_API}//admin/${admin._id}/users/count`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            if (usercount) {
                usercount.innerHTML = ''
                usercount.insertAdjacentHTML('afterbegin',
                    `
            ${response.data}
            `)
            }

        })
        .catch((err) => {
            console.log(err)
        })
}
setUserCount()

var totalorders = document.querySelector('.totalorders')

function settotalOrders() {
    const token = JSON.parse(localStorage.getItem("jwt")).token
    const admin = JSON.parse(localStorage.getItem('jwt')).user
    // console.log(admin._id, token)
    axios.get(`${HEROKU_API}/admin/${admin._id}/orders/count`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            if (totalorders) {
                totalorders.innerHTML = ''
                totalorders.insertAdjacentHTML('afterbegin',
                    `
            ${response.data}
            `)
            }

        })
        .catch((err) => {
            console.log(err)
        })
}
settotalOrders()

var riderTable = document.querySelector('.riderTable')

// Get riders
function getAllRiders() {
    const token = JSON.parse(localStorage.getItem('jwt')).token
    // loadLoader()
    axios.get('${HEROKU_API}/allriders', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            closeLoader()
            riderTable.innerHTML = ''
            riderTable.insertAdjacentHTML('beforeend',
                `
                <tr class="bg-dark white">
                    <th>Rider</th>
                    <th>Pending Orders</th>
                </tr>
        
            `)
            response.data.map(async (rider) => {
                const processedOrdersCount = await getProcessedOrdersOfRider(rider._id)
                return (
                    riderTable.insertAdjacentHTML('beforeend',
                        `
                    <tr>
                        <th class="pointer select-rider" onclick="assignOrder('${rider._id}')" data-dismiss="modal">${rider.name}</th>
                        <th>${processedOrdersCount}</th>
                    </tr>
                    `)
                )
            })
        })
        .catch((err) => {
            console.log(err)
        })
}
getAllRiders()
// Riders processed orders count
async function getProcessedOrdersOfRider(riderId) {
    const token = JSON.parse(localStorage.getItem('jwt')).token
    const admin = JSON.parse(localStorage.getItem('jwt')).user
    return await axios.get(`${HEROKU_API}/admin/${admin._id}/pendingorder/rider/${riderId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then((response)=>{
        return response.data
    })
    .catch((err)=>{
        console.log()
    })
}
// Assignment to rider

// Get not processed orders
var pendingordersTable = document.querySelector('.pendingordersTable')

function getPendingOrders() {
    const token = JSON.parse(localStorage.getItem('jwt')).token
    const admin = JSON.parse(localStorage.getItem('jwt')).user
    loadLoader()
    axios.get(`${HEROKU_API}//admin/${admin._id}/being processed`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            // console.log(response.data)
            closeLoader()
            pendingordersTable.innerHTML = ''
            pendingordersTable.insertAdjacentHTML('beforeend',
                `
            <tr>
                <th></th>
                <th>User Name</th>
                <th>User Phone</th>
                <th>Total Amount</th>
                <th></th>
            </tr>
            `)

            response.data.map((order) => {
                return (
                    pendingordersTable.insertAdjacentHTML('beforeend',
                        `
                    <tr>
                        <th class="flex"><button type="button" class="btn btn-info" data-toggle="modal"
                        data-target="#orderproducts" id="${order.name}"   onclick="displayOrderProducts('${order._id}')">View products</button></th>
                        <th>${order.user.fullname}</th>
                        <th>${order.user.phone}</th>
                        <th>${order.amount}-PKR</th>
                        <th class="flex"><button type="button" class="btn btn-info" data-toggle="modal"
                        data-target="#assignmodal" onclick="setNPOtoLS('${order._id}')">Assign</button></th>
                    </tr>
                    `)
                )

            })
        })
        .catch((err) => {
            console.log(err)
        })

}
getPendingOrders()

// Setting not processed order to localstorage for time being for accesability
function setNPOtoLS(orderId) {
    localStorage.setItem('npo', JSON.stringify(orderId))
}

var orderProducts = document.querySelector('.orderProducts')

function displayOrderProducts(orderId) {
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

// Assign selected order to selected rider

function assignOrder(riderId) {
    const orderId = JSON.parse(localStorage.getItem('npo'))
    const token = JSON.parse(localStorage.getItem('jwt')).token
    loadLoader()
    axios.put(`${HEROKU_API}/order/${orderId}/assignrider/${riderId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            // updating order status
            updateOrderStatus(orderId)
            getPendingOrders()
            localStorage.removeItem('npo')
        })
        .catch((err) => {
            alert("Can not assign this order.")
        })
}


function updateOrderStatus(orderId) {
    // Order status is getting automatically changed at backend.
    // console.log(orderId)
    // const splitting = statusObj.split(',')
    // const orderId = splitting[0]
    // const statusL = splitting[1]
    // const token = JSON.parse(localStorage.getItem('jwt')).token
    // const admin = JSON.parse(localStorage.getItem('jwt')).user
    // axios.put(`https://atghar-testing.herokuapp.com/api/order/${orderId}/changestatus/admin/${admin._id}`,{
    //     status : "confirmed"
    // },{
    //     headers:{
    //         Authorization: `Bearer ${token}`
    //     }
    // })
    // .then((response)=>{
    //     location.reload()
    // })
    // .catch((err)=>{
    //     console.log(err)
    // })
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
}