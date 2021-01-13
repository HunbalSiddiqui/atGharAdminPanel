
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
                data-target="#riderhistory">View History</button></th>
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
    axios.delete(`https://atghar-testing.herokuapp.com/api//admin/${admin._id}/rider/${riderId}`,{
        headers:{
            Authorization : `Bearer ${token}`
        }
    })
    .then((response)=>{
        console.log(response.data)
        getAllRiders()
    })
    .catch((err)=>{
        console.log(err)
    })
}

// Rirder history popup
const riderHistory = document.querySelector('.riderHistory')

function displayRiderHistory(riderId){
    
}