import { menuArray } from '/data.js'

const menu = document.getElementById("menu")
const order = document.getElementById("order")
const paymentSection = document.getElementById("payment-section")
const paymentForm = document.getElementById("payment-form")
// const messageContainer = document.getElementById("message-container")
const orderedItems = []

let customerName = ""

// add count property to each menu item
menuArray.forEach(function(item){
    item.count = 0
})

document.addEventListener('click', function(e){
    if(e.target.dataset.addid){    
        addItemToOrder(e.target.dataset.addid)
    }

    else if(e.target.dataset.removeid){
        removeItemFromOrder(e.target.dataset.removeid)
    }

    else if(e.target.id === "submit-order-btn"){
        paymentSection.classList.remove("hidden")
    }
})

paymentForm.addEventListener('submit', function(e){
   submitPaymentForm(e)  
})

function addItemToOrder(itemId){
    const targetItem = menuArray.filter(function(item){
        return item.id === parseInt(itemId)
    })[0]

    // add item to orderedItems array if not included in array then increment count value
    if(!orderedItems.includes(targetItem)) {
        orderedItems.push(targetItem)
    } 

    orderedItems.forEach(function(item){
        if(item.id === targetItem.id){
            item.count++
        }
    })

    // display order element
    order.classList.add("block")
    order.classList.remove("hidden")

    renderOrder()
}

function removeItemFromOrder(itemId){
    const targetItem = orderedItems.filter(function(item){
        return item.id === parseInt(itemId)
    })[0]

    //decrement count and remove item from orderedItems array if id count is 0
    orderedItems.forEach(function(item, index){
        if(item.id === targetItem.id){
            item.count--
        }

        if(item.count === 0){
            orderedItems.splice(index, 1)
        }
    })

    if(orderedItems.length < 1){
        order.classList.add("hidden")
        order.classList.remove("block")
    }

    renderOrder()
}

// generate comma-separated list of ingredients for each menu item
function getIngredients(item){
    let itemList = ``
    item.ingredients.forEach(function(ingredient, i){
        if(i === item.ingredients.length - 1){
            itemList += `${ingredient}`
        }
        else{
            itemList += `${ingredient}, `
        } 
    })
    return itemList
}

// calculate the total order price excluding discount
function getOrderPriceExDiscount(){
    let orderPriceExDiscount = 0
    menuArray.forEach(function(item){
        orderPriceExDiscount += item.count * item.price
    })
    return orderPriceExDiscount
}

function getMenuHTML() {
    let menuHTML = ``

    menuArray.forEach(function(item){

        // HTML to render menu items
        menuHTML += `
        <div class="item-outer">
            <div class="item">
                <div class="item-img-container">
                    <img class="item-img" src="Images/${item.img}" alt="${item.name}">
                </div>
                <div class="item-description">
                    <h2 class="item-name">${item.name}</h2>
                    <h3 class="ingredients">${getIngredients(item)}</h3>
                    <h4 class="price">$${item.price.toFixed(2)}</h4>
                </div>
            </div>
            <div class="add-item-container">
                <p class="add-item" data-addid="${item.id}">+</p> 
            </div>
        </div>`
    })
    menu.innerHTML = menuHTML

    return menuHTML
}

function getOrderHTML(){
    let orderHTML = ``
    let orderPrice = 0
    let percentDiscount = 10
    let messageHTML = ``

    //calculate prices for items and total price
    orderedItems.forEach(function(item){

        const pizzasOrdered = menuArray.filter(function(item){
            return item.name === "Pizza"
        })[0] 

        if(item !== pizzasOrdered){
            item.totalPrice = item.count * item.price
        }
        // logic to calculate discounted items prices
        else{
            if(item.count%2 === 0){
                item.totalPrice = ((item.count / 2) * item.price) + (((item.count  / 2) * item.price) * (100 - percentDiscount) / 100)
                messageHTML = ``
            }
            else{
                item.totalPrice = (((item.count + 1) / 2) * item.price) + ((((item.count - 1) / 2) * item.price) * (100 - percentDiscount) / 100)
                messageHTML = `<h3>Add another pizza at 10% discount</h3>`
            }
        }
        
        // calculate the total order price including discount
        orderPrice += item.totalPrice
    })

    // HTML to render items ordered
    orderedItems.forEach(function(orderedItem){
        orderHTML += `
        <div class="order-item-container">
            <div class="order-item">
                <h2 class="order-item-name">${orderedItem.name}<h3 class="remove" data-removeid="${orderedItem.id}">remove</h3></h2>
            </div>
            <div class="order-item-price-container">
                <h3 class="count">count: ${orderedItem.count}</h3>
                <h4 class="order-item-price">$${orderedItem.totalPrice.toFixed(2)}</h4>
            </div>
        </div>`
    }) 

    // HTML for order section, containing HTML for items ordered and discount message
    const orderSectionHTML = `
    <h2 class="your-order">Your order</h2>
        <div class="order-outer">

            ${orderHTML}
            
            <div class="message-container">

                ${messageHTML}

            </div>
        </div>

        <div class="total-container">
            <h3 class="total-price-text">Price excluding discount:</h2>
            <h3 class="total-price">$${getOrderPriceExDiscount().toFixed(2)}</h4>
        </div>
        <div class="total-container">
            <h2 class="total-price-text">You pay:</h2>
            <h4 class="total-price">$${orderPrice.toFixed(2)}</h4>
        </div>
        <button type="button" class="submit-order-btn" id="submit-order-btn">Complete order</button>`

    return orderSectionHTML
}

function submitPaymentForm(e){
    e.preventDefault()
    customerName = document.getElementById("name").value
    paymentSection.classList.add("hidden")

    // clear form fields
    const inputFields = document.querySelectorAll("input")
    inputFields.forEach(function(field){
        field.value = ""
    })

    // reset count property to 0 for each item
    menuArray.forEach(function(item){
        item.count = 0
    })

    order.innerHTML = `<h2 class="order-confirmation">Thanks, ${customerName}! Your order is on its way!</h2>`

    // clear all items from orderedItems array
    orderedItems.length = 0
}

function renderMenu(){
    menu.innerHTML = getMenuHTML()
}

function renderOrder(){
    order.innerHTML = getOrderHTML()
}

renderMenu()

