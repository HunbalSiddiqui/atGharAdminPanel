const { default: axios } = require("axios")

var usercount = document.querySelector('.usercount')

function setUserCount() {
    const token = JSON.parse(localStorage.getItem("jwt")).token
    const admin = JSON.parse(localStorage.getItem("jwt")).user
    axios.get(`https://atghar-testing.herokuapp.com/api//admin/${admin._id}/users/count`, {
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
    axios.get(`https://atghar-testing.herokuapp.com/api/admin/${admin._id}/orders/count`, {
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
    axios.get('https://atghar-testing.herokuapp.com/api/allriders', {
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
        </tr>
        
        `)
            response.data.map((rider) => {
                return (
                    riderTable.insertAdjacentHTML('beforeend',
                        `
            <tr class="pointer">
                <th>${rider.name}</th>
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

// Assignment to rider

// Get not processed orders
var pendingordersTable = document.querySelector('.pendingordersTable')

function getPendingOrders() {
    const token = JSON.parse(localStorage.getItem('jwt')).token
    loadLoader()
    axios.get(`https://atghar-testing.herokuapp.com/api//admin/5ff6fd72e301d2483565adc1/Cancelled`, {
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
                        data-target="#assignmodal">Assign</button></th>
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

var orderProducts = document.querySelector('.orderProducts')

function displayOrderProducts(orderId) {
    console.log(orderId)
    axios.get(`https://atghar-testing.herokuapp.com/api//order/5fd9f2155703b58e7dfd4b00/user/5fce32e5d317b530f4a057a0`)
}