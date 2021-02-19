function loadLoader() {
    var loader = document.querySelector('.loader')
    loader.style.display = 'block'
}
// console.log("-------\n------")

function closeLoader() {
    var loader = document.querySelector('.loader')
    loader.style.display = 'none'
}

var userTable = document.querySelector('.userTable')

function getUsers() {
    loadLoader()
    const token = JSON.parse(localStorage.getItem('jwt')).token
    const admin = JSON.parse(localStorage.getItem('jwt')).user
    axios.get(`https://atghar-testing.herokuapp.com/api/admin/${admin._id}/users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            closeLoader()
            userTable.innerHTML = ''
            userTable.insertAdjacentHTML('beforeend',
                `
    <tr>
        <th>User Name</th>
        <th>Contact</th>
        <th></th>
    </tr>
    
    `)
            response.data.map((user) => {
                // console.log(user)
                return (
                    userTable.insertAdjacentHTML('beforeend',
                        `
            <tr>
            <th>${user.firstname} ${user.lastname}</th>
            <th>${user.phone}</th>
            <th class="flex"><button type="button" class="btn btn-primary" data-toggle="modal"
            data-target="#userhistory" onclick="setOrderHistory('${user._id}')">View History</button></th>
        </tr>
            `)
                )
            })
        })
        .catch((err) => {
            console.log(err)
        })
}
getUsers()


var userorderhistory = document.querySelector('.userorderhistory')

function setOrderHistory(userId) {
    const token = JSON.parse(localStorage.getItem('jwt')).token
    const admin = JSON.parse(localStorage.getItem('jwt')).user
    loadLoader()
    axios.get(`https://atghar-testing.herokuapp.com/api/admin/${admin._id}/orders/by/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            userorderhistory.innerHTML = ''
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
        userorderhistory.innerHTML = ''
        orderHist.map((order) => {
            // console.log(order.amount,order.products)
            var productObj = ''
            order.products.forEach(product => {
                productObj += "ProductName: " + product.productname + ", " + "Price: " + product.price + ", " + "Quantity: " + product.qt + "\n";
                // productObj += "\r\n"
            });
            return (
                userorderhistory.insertAdjacentHTML('beforeend',
                    `
            <p class="pointer flex-col f1-5 userorderhistory-bar" data-toggle="collapse" href="#${order._id}" role="button"
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