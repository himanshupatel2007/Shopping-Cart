const logoutbtn = document.querySelector(".username")
let container = document.querySelector(".productslist")
let numberresult = document.querySelector(".results")

// Selecting  the cart 
let cartsection = document.querySelector(".cartitems")
let cartsummary = document.querySelector(".cartresult")
 //pputtoing the cart in hte main content

document.querySelector(".maincontent").appendChild(cartsection)
document.querySelector(".maincontent").appendChild(cartsummary)

let cart = []

const filters = document.querySelectorAll(".options")
filters.forEach(event => {
    event.addEventListener("click", (e) => {
        //hideng cart and show lists
        cartsection.classList.add("hide")
        cartsummary.classList.add("hide")
        container.classList.remove("hide")

        switch (e.target.textContent) {
            case "Jeans": display("jeans")
                break;
            case "Sweaters": display("sweater")
                break;
            case "Shoes": display("shoes")
                break;
            case "Hats": display("hat")
                break;
            case "Shirts": display("shirt")
                break;
            case "Clear Filters": clearfilter()
                break;
        }
    })
})


document.querySelector(".cart").addEventListener("click", () => {
    rendercart()
})

function clearfilter() {
    container.innerHTML = ""
    numberresult.textContent = `Showing : X`
    

    cartsection.classList.add("hide")
    cartsummary.classList.add("hide")
    container.classList.remove("hide")
}

function display(value) {
   
    
    let value = `./assets/jsonfiles/${value}.json`
    
    fetch(value)
        .then(response => response.json())
        .then(item => {
            let number = 0;
            container.innerHTML = "" //clearing the previous content so that the page do not get messy
            
            item.forEach(data => {
             
                let checkcart = false
                cart.forEach(product => {
                    if (product.productname === data.productname) {
                        checkcart = true
                    }
                })

                let maindiv = document.createElement("div")
                let image = document.createElement("img")
                let div1 = document.createElement("div")
                let h2 = document.createElement("h2")
                let p = document.createElement("p")
                let h22 = document.createElement("h2")
                let div2 = document.createElement("div")
                let span = document.createElement("span")
                let p2 = document.createElement("p")
                let button = document.createElement("button")

                maindiv.classList.add("product")
                image.src = data.location;
                div1.classList.add("details")
                h2.textContent = data.productname
                h2.classList.add("productname")
                p.classList.add("productdetails")
                p.textContent = data.description
                h22.classList.add("priceofproduct")
                h22.textContent = `${data.price}$`
                div2.classList.add("productcolor")
                span.style.backgroundColor = data.color
                p2.textContent = data.color
                button.classList.add("add")
                
                if(checkcart){
                    button.textContent = "Already Added"
                    button.disabled = true
                } else {
                    button.textContent = "Add to Cart"
                    button.addEventListener("click", ()=>{
                        //adding hte product to cart list
                        data.quantity = 1
                        cart.push(data)
                        
                        button.textContent = "Already Added"
                        button.disabled = true
                        alert("Added to Cart")
                    })
                }

                div1.appendChild(h2)
                div1.appendChild(p)
                div1.appendChild(h22)
                div1.appendChild(div2)
                div1.appendChild(button)
                div2.appendChild(span)
                div2.appendChild(p2)
                maindiv.appendChild(image)
                maindiv.appendChild(div1)
                container.appendChild(maindiv)
                
                number++;
                numberresult.textContent = `Showing : ${number}`
            })
        })
}

function rendercart(){
    // Hide product container, Show cart containers
    container.classList.add("hide")
    numberresult.textContent = "Your Cart"
    cartsection.classList.remove("hide")
    cartsummary.classList.remove("hide")

    cartsection.innerHTML = "" // Clearing  old cart html

    if(cart.length === 0){
        cartsection.innerHTML = "<h1>Your Cart is Empty</h1>"
        calculatetotal()
    }

    cart.forEach((data, index) => {
        let maindiv = document.createElement("div")
        let image = document.createElement("img")
        let div1 = document.createElement("div")
        let h2 = document.createElement("h2")
        let p = document.createElement("p")
        let h22 = document.createElement("h2")
        let div2 = document.createElement("div")
        let span = document.createElement("span")
        let p2 = document.createElement("p")
        
        let ops = document.createElement("div")
        let minbtn = document.createElement("button")
        let qty = document.createElement("p")
        let maxbtn = document.createElement("button")
        let removebtn = document.createElement("button")

        maindiv.classList.add("product")
        image.src = data.location;
        div1.classList.add("details")
        
        // Bulk Badge Logic
        if(data.quantity >= 5){
             h2.textContent = `${data.productname }+ BULK `
        } else {
             h2.textContent = data.productname
        }
        
        h2.classList.add("productname")
        p.classList.add("productdetails")
        p.textContent = data.description
        h22.classList.add("priceofproduct")
        h22.textContent = `${data.price}$`
        div2.classList.add("productcolor")
        span.style.backgroundColor = data.color
        p2.textContent = data.color


        ops.classList.add("cartoperations")
        minbtn.textContent = "-"
        qty.textContent = data.quantity
        maxbtn.textContent = "+"

        if(data.quantity <= 1){
            minbtn.disabled = true
        }

        minbtn.addEventListener("click", ()=>{
            cart[index].quantity = cart[index].quantity - 1
             calculatetotal()
        })
        maxbtn.addEventListener("click", ()=>{
            cart[index].quantity = cart[index].quantity + 1
              calculatetotal()
        })

        // Remove Button
        removebtn.classList.add("buybtn")
        removebtn.textContent = "Remove"
        removebtn.addEventListener("click", ()=>{
            cart.splice(index, 1)
            rendercart()
        })

        ops.appendChild(minbtn)
        ops.appendChild(qty)
        ops.appendChild(maxbtn)

        div1.appendChild(h2)
        div1.appendChild(p)
        div1.appendChild(h22)
        div1.appendChild(div2)
        div1.appendChild(ops)
        
        div2.appendChild(span)
        div2.appendChild(p2)
        
        maindiv.appendChild(image)
        maindiv.appendChild(div1)
        maindiv.appendChild(removebtn)
        
        cartsection.appendChild(maindiv)
    })
    
    calculatetotal()
}

function calculatetotal(){
    let totalqty = 0
    let subtotal = 0
    
    cart.forEach(item => {
        totalqty = totalqty + item.quantity
        subtotal = subtotal + (item.price * item.quantity)
    })

    let discount = 0
    let message = "No Discount"

    if(subtotal >= 100){
        discount = subtotal * 0.15
        message = "15% Discount"
    } else if(subtotal >= 50){
        discount = subtotal * 0.10
        message = "10% Discount"
    }

    let final = subtotal - discount
    let h3all = cartsummary.querySelectorAll("h3")
    h3all[0].textContent = `Items in Cart : ${totalqty}`
    h3all[1].textContent = `Subtotal : ${subtotal}$`
    h3all[2].textContent = `Discount : -${discount}$ (${message})`
    h3all[3].textContent = `Final Price : ${final}$`

    let clearbtn = document.querySelector(".clearcartbutton")
    clearbtn.addEventListener("click", ()=>{
        cart = []
        rendercart()
    })
}

logoutbtn.addEventListener("click", () => {
    document.querySelector(".mainpage").classList.add("hide")
    document.querySelector(".loginpage").classList.remove("hide")
})