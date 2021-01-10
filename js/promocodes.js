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
    const token = JSON.parse(localStorage.getItem('jwt')).token;
    const admin = JSON.parse(localStorage.getItem('jwt')).user
    loadLoader()
    axios.get(`https://atghar-testing.herokuapp.com/api//admin/${admin._id}/promocodes`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
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
                if (promo.isValid) {
                    return (
                        promocodeTable.insertAdjacentHTML('beforeend',
                            `
                    <tr>
                        <th class="flex"><button type="button" class="btn btn-danger" data-toggle="modal"
                        data-target="#deletepromo" id="${promo.name}"   onclick="deletePromoCode('${promo.name}')">Delete</button></th>
                        <th>${promo.name}</th>
                        <th>${promo.offPercentage}%</th>
                        <th class="flex"><button type="button" class="btn btn-warning" data-toggle="modal"
                        data-target="#disablepromo" onclick="disablePromoCode('${promo._id},${promo.name},${promo.offPercentage}')">Disable</button></th>
                    </tr>
                    `)
                    )
                } else {
                    return (
                        promocodeTable.insertAdjacentHTML('beforeend',
                            `
                    <tr>
                        <th class="flex"><button type="button" class="btn btn-danger" data-toggle="modal"
                        data-target="#deletepromo" id="${promo.name}"   onclick="deletePromoCode('${promo.name}')">Delete</button></th>
                        <th>${promo.name}</th>
                        <th>${promo.offPercentage}%</th>
                        <th class="flex"><button type="button" class="btn btn-success" data-toggle="modal"
                        data-target="#disablepromo" onclick="activtePromoCode('${promo._id},${promo.name},${promo.offPercentage}')">Activate</button></th>
                    </tr>
                    `)
                    )
                }
            })
        })
        .catch((err) => {
            console.log(err)
        })
}
getAllPromoCodes()


function deletePromoCode(promo) {
    const token = JSON.parse(localStorage.getItem('jwt')).token
    const admin = JSON.parse(localStorage.getItem('jwt')).user
    console.log(token,admin._id)
    loadLoader()
    axios.post(`https://atghar-testing.herokuapp.com/api/admin/${admin._id}/promocode/delete/${promo}`, {
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

function disablePromoCode(promoCompound) {
    const promo = promoCompound.split(',')
    const promoid = promo[0];
    const promoname = promo[1];
    const promoOff = promo[2];
    console.log(promoid, promoname, promoOff)
    const token = JSON.parse(localStorage.getItem('jwt')).token
    console.log(token,admin._id)
    loadLoader()
    https://atghar-testing.herokuapp.com/api//promocode/5fd8c37f9d0264ab405da272
    axios.put(`https://atghar-testing.herokuapp.com/api/promocode/${promo}`, {
            name: promoname,
            isValid: false,
            offPercentage: promoOff
        })
        .then((response) => {
            getAllPromoCodes();
        })
        .catch((err) => {
            console.log(err)
        })
}

function activtePromoCode(promoCompound) {
    const promo = promoCompound.split(',')
    const promoid = promo[0];
    const promoname = promo[1];
    const promoOff = promo[2];
    console.log(promoid, promoname, promoOff)
    const token = JSON.parse(localStorage.getItem('jwt')).token
    loadLoader()
    axios.put(`https://atghar-testing.herokuapp.com/api/promocode/${promoid}`, {
            name: promoname,
            isValid: true,
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