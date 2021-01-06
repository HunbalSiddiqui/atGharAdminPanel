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
            <th>Promo Name</th>
            <th></th>
        </tr>
        
        `)
            response.data.map((rider) => {
                return (
                    riderTable.insertAdjacentHTML('beforeend',
                        `
                <tr>
                <th class="flex"><button type="button" class="btn btn-danger" data-toggle="modal"
                data-target="#deleterider">Delete</button></th>
                <th>${rider.name}</th>
                <th>${rider.email}</th>
                <th class="flex"><button type="button" class="btn btn-warning" data-toggle="modal"
                data-target="#disablepromo">View History</button></th>
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