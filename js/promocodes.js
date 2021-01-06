function loadLoader() {
    var loader = document.querySelector('.loader')
    loader.style.display = 'block'
}

function closeLoader() {
    var loader = document.querySelector('.loader')
    loader.style.display = 'none'
}
var promocodeTable = document.querySelector('.promocodeTable')


function getAllPromoCodes() {
    loadLoader()
    axios.get('https://atghar-testing.herokuapp.com/api/promocodes')
        .then((response) => {
            closeLoader()
            promocodeTable.innerHTML = ''
            promocodeTable.insertAdjacentHTML('beforeend',
                `
        <tr>
            <th></th>
            <th>Promo Name</th>
            <th>Off Percentage</th>
            <th></th>
        </tr>
        
        `)
            response.data.map((promo) => {
                console.log(promo)
                return (
                    promocodeTable.insertAdjacentHTML('beforeend',
                        `
                <tr>
                <th class="flex"><button type="button" class="btn btn-danger" data-toggle="modal"
                data-target="#deletepromo" id="${promo.name}"   onclick="deletePromoCode('${promo.name}')">Delete</button></th>
                <th>${promo.name}</th>
                <th>${promo.offPercentage}%</th>
                <th class="flex"><button type="button" class="btn btn-warning" data-toggle="modal"
                data-target="#disablepromo" onclick="updatePromoCode('${promo._id,promo.name,promo.offPercentage}')">Disable</button></th>
            </tr>
                `)
                )
            })
        })
        .catch((err) => {
            console.log(err)
        })
}
getAllPromoCodes()


function deletePromoCode(promo) {
    const token = JSON.parse(localStorage.getItem('jwt')).token
    loadLoader()
    axios.post(`https://atghar-testing.herokuapp.com/api/promocode/delete/${promo}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            getAllPromoCodes()
        })
        .catch((err) => {
            console.log(err)
        })
}

// disable promo

function updatePromoCode(promoid,promoname,promoOff) {
    console.log(JSON.parse(promoid,promoname,promoOff))
    const token = JSON.parse(localStorage.getItem('jwt')).token
    loadLoader()
    axios.put(`https://atghar-testing.herokuapp.com/api/promocode/${promoid}`, {
            name: promoname,
            isValid: false,
            offPercentage: promoOff
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            getAllPromoCodes();
        })
        .catch((err) => {
            console.log(err)
        })
}