// Verifyin if user is login and has admin controls
if (!localStorage.getItem('jwt')) {
    location.assign('../index.html')
}
if (JSON.parse(localStorage.getItem("jwt")).user.role === 1) {
    // TODO: redirect to required page
}

function loadLoader() {
    var loader = document.querySelector('.loader')
    loader.style.display = 'block'
}

function closeLoader() {
    var loader = document.querySelector('.loader')
    loader.style.display = 'none'
}

var refreshBtn = document.querySelector('.refreshBtn')
refreshBtn.addEventListener('click',()=>{
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
                    data-target="#orderproducts" id="${order.name}"   onclick="displayOrderProducts('${order._id}')">View products</button></th>
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
                    <th></th>
                    <th>${order.user.fullname}</th>
                    <th>${order.user.phone}</th>
                    <th>${order.amount}-PKR</th>
                    <th class="flex"><button type="button" class="btn btn-info" data-toggle="modal"
                    data-target="#orderproducts" id="${order.name}"   onclick="displayOrderProducts('${order._id}')">View products</button></th>
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
                    data-target="#orderproducts" id="${order.name}"   onclick="displayOrderProducts('${order._id}')">View products</button></th>
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
                    <th></th>
                    <th>${order.user.fullname}</th>
                    <th>${order.user.phone}</th>
                    <th>${order.amount}-PKR</th>
                    <th class="flex"><button type="button" class="btn btn-info" data-toggle="modal"
                    data-target="#orderproducts" id="${order.name}"   onclick="displayOrderProducts('${order._id}')">View products</button></th>
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