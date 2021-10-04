const productsInput = document.querySelector('#products')
const ordersInput = document.querySelector('#orders')
const dropdownInput = document.querySelector('#package')
const dropdownOptions = document.querySelector('.select__dropdown')

const accounting = document.querySelector('#accounting')
const terminal = document.querySelector('#terminal')


const elements = [productsInput, ordersInput]
for (const elem of elements) {
    elem.addEventListener('change', onClick)
    // item.addEventListener('change', onUncheck)
}

dropdownInput.addEventListener('click', onClickDropdown)
dropdown = dropdownOptions.children;
[...dropdown].forEach(el => el.addEventListener('click', onChoose))

const items = [accounting, terminal]
for (const item of items) {
    item.addEventListener('change', onCheck)
    // item.addEventListener('change', onUncheck)
}


function onClick(event) {

    const error = validate()
    console.log(this)

    if(error === null) {
        // const products = productsInput.value
        const item = this.value
        console.log(this)

        const numChild = (this === productsInput) ? 1 : 2

        const div= document.querySelector(`.calc__summary .list__item:nth-child(${numChild})`)
        const item_calc = div.children[1]
        const item_price = div.lastElementChild
        div.classList.add('open')

        item_calc.innerHTML = `${item} * $0.5`
        const newPriceProd = (item * 0.5).toFixed(1)
        item_price.innerHTML = `$${newPriceProd}`


        div.setAttribute('data-price', newPriceProd)
    }
    else {
        event.preventDefault()
        alert(error)

    }

    calc()

}



function onClickDropdown(event) {
    dropdownInput.classList.toggle('open')
    
}

function onChoose() {

   
    const basicOption = document.querySelector('[data-value = basic]')
    const profOption = document.querySelector('[data-value = professional]')
    const premiumOption = document.querySelector('[data-value = premium]')
    console.log(this)


    const div = document.querySelector('.calc__summary .list__item:nth-child(3)')
    const item_calc = div.children[1]
    const item_price = div.lastElementChild

    if(this === basicOption) {
        div.classList.add('open')
        const basic = basicOption.innerText
        item_calc.innerHTML = `${basic}`
        item_price.innerHTML = '$0'
    }

    else if (this === profOption) {
        div.classList.add('open')
        const prof = profOption.innerText
        item_calc.innerHTML = `${prof}`
        item_price.innerHTML = '$25'
        div.setAttribute('data-price', 25)
    }

    else {
        div.classList.add('open')
        const premium = premiumOption.innerText
        item_calc.innerHTML = `${premium}`
        item_price.innerHTML = '$60'
        div.setAttribute('data-price', 60)
    }
    
    calc()
}




function onCheck(event) {
    
  
    const numChild = (this === accounting) ? 4 : 5

    const div = document.querySelector(`.calc__summary .list__item:nth-child(${numChild})`)
    div.classList.toggle('open')

    if(this.checked) {
        const currentPrice = (this === accounting) ? 30 : 10
        div.setAttribute('data-price', currentPrice)
    }

    calc()
}





function calc() {
    const priceAll = document.querySelectorAll('[data-price]')
    const inputsAll = [...priceAll].map( el => parseFloat(el.dataset.price))
                                   .reduce( (sum, acc) => sum + acc, 0) 
    console.log(inputsAll)

    const summary = document.querySelector('.summary__total')
    const total = document.querySelector('.total__price')
    total.innerText = `$${inputsAll}`
    summary.classList.add('open')
}

function validate(event) {

    const products = productsInput.value
    const orders = ordersInput.value

    for( const item in [products, orders]) {
        function isNatural(item){
            var intNum = parseInt(item);
            var floatNum = parseFloat(item);
            return (intNum == floatNum) && intNum >=0;
        }
        return null
    }
}