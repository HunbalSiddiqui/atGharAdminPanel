var usercount = document.querySelector('.usercount')
function setUserCount() {
    axios.get('https://atghar-testing.herokuapp.com/api/users/count')
    .then((response)=>{
        console.log(response.data)
        usercount.innerHTML=''
        usercount.insertAdjacentHTML('afterbegin',
        `
        ${response.data}
        `)
    })
    .catch((err)=>{
        console.log(err)
    })
}
setUserCount()