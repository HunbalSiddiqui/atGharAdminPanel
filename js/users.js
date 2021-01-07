function loadLoader() {
    var loader = document.querySelector('.loader')
    loader.style.display = 'block'
}

function closeLoader() {
    var loader = document.querySelector('.loader')
    loader.style.display = 'none'
}

var userTable = document.querySelector('.userTable')

function getUsers() {
    loadLoader()
    axios.get('https://atghar-testing.herokuapp.com/api/users')
        .then((response) => {
            closeLoader()
            userTable.innerHTML = ''
            userTable.insertAdjacentHTML('beforeend',
                `
    <tr>
        <th>User Name</th>
        <th>User Email</th>
        <th>Contact</th>
        <th>Address</th>
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
            <th>${user.email}</th>
            <th>${user.phone}</th>
            <th>${user.address}</th>
            <th class="flex"><button type="button" class="btn btn-primary" data-toggle="modal"
            data-target="#userhistory" onclick={'${setOrderHistory(user)}'}>View History</button></th>
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

function setOrderHistory(user) {
    console.log(user)
    userorderhistory.innerHTML = ''
    userorderhistory.insertAdjacentHTML("beforeend",
        `
        <p data-toggle="collapse"
                        data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                            ${user._id}
                        </p>
                        <div class="collapse" id="collapseExample">
                            <div class="card card-body">
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad
                                squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente
                                ea proident.
                            </div>
                        </div>
        `)

}