var productsearcbar = document.querySelector('.productsearcbar')
var suggestionBox = document.querySelector('.suggestionBox')
var forminput = ""
productsearcbar.addEventListener('keyup',async()=>{
    forminput=productsearcbar.value
    if(forminput!=="")
    {
        suggestionBox.style.display = 'flex'
        fetchSearchProducts()
    }
    else if(forminput===""){
        suggestionBox.style.display = 'none'
    }
})

function fetchSearchProducts() {
    axios.get(`https://atghar-testing.herokuapp.com/api//products/search?search=${forminput}&category=All`)
    .then((response)=>{
        suggestionBox.innerHTML = ''
        response.data.map((product)=>{
            return (
                suggestionBox.insertAdjacentHTML('beforeend',
                `
                <div class="suggestionBox-product-item f1-5 flex-start">
                ${product.productname}
                </div>
                `)
            )
        })
        
    })
    .catch((err)=>{
        console.log(err)
    })
}