function loadLoader() {
    var loader = document.querySelector('.loader')
    loader.style.display = 'block'
}

function closeLoader() {
    var loader = document.querySelector('.loader')
    loader.style.display = 'none'
}
var riderTable = document.querySelector('.riderTable')

function getAllRiders() {
    const token = JSON.parse(localStorage.getItem('jwt')).token
    loadLoader()
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
        <tr>
            <th></th>
            <th>Rider Name</th>
            <th>Rider Email</th>
            <th></th>
        </tr>
        
        `)
            response.data.map((rider) => {
                return (
                    riderTable.insertAdjacentHTML('beforeend',
                        `
                <tr>
                <th class="flex"><button type="button" class="btn btn-danger" data-toggle="modal"
                data-target="#deleterider" onclick="deleteRider('${rider._id}')">Delete</button></th>
                <th>${rider.name}</th>
                <th>${rider.email}</th>
                <th class="flex"><button type="button" class="btn btn-primary" data-toggle="modal"
                data-target="#riderhistory" onclick="displayRiderHistory('${rider._id}')">View History</button></th>
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


function deleteRider(riderId) {
    loadLoader()
    const admin = JSON.parse(localStorage.getItem('jwt')).user
    const token = JSON.parse(localStorage.getItem('jwt')).token
    axios.delete(`https://atghar-testing.herokuapp.com/api//admin/${admin._id}/rider/${riderId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(response.data)
            getAllRiders()
        })
        .catch((err) => {
            console.log(err)
        })
}

// Rirder history popup
const riderHistory = document.querySelector('.riderHistory')

function displayRiderHistory(riderId) {
    const token = JSON.parse(localStorage.getItem('jwt')).token
    const admin = JSON.parse(localStorage.getItem('jwt')).user
    loadLoader()
    axios.get(`https://atghar-testing.herokuapp.com/api/admin/${admin._id}/rider/deliveryhistory/${riderId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            riderHistory.innerHTML = ''
            closeLoader()
            displayOrderHistory(response.data)
        })
        .catch((err) => {
            console.log(err)
        })

}

function displayOrderHistory(orderHist) {
    // console.log(orderHist)
    if (orderHist.length > 0) {
        riderHistory.innerHTML = ''
        orderHist.map((order) => {
            // console.log(order.amount,order.products)
            var productObj = ''
            order.products.forEach(product => {
                productObj += "ProductName: " + product.productname + ", " + "Price: " + product.price + ", " + "Quantity: " + product.qt + "\n";
                // productObj += "\r\n"
            });
            return (
                riderHistory.insertAdjacentHTML('beforeend',
                    `
            <p class="pointer flex-col f1-5 riderHistory-bar" data-toggle="collapse" href="#${order._id}" role="button"
            aria-expanded="false" aria-controls="${order._id}">
            <span>T-Id: ${order.transaction_id}</span>
            <span>Amount: ${order.amount}</span>
            <span>Status: ${order.status}</span>
            <button type="button" class="btn btn-light">ViewMore</button>
            </p>
            <div class="collapse" id="${order._id}">
              <div class="card card-body">
                ${productObj}
              </div>
            </div>
            `)
            )
        })
    } else {
        console.log("No orders")
    }
}