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
    console.log(admin._id, token)
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