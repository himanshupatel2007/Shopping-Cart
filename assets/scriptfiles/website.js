const logoutbtn = document.querySelector(".username")
let container = document.querySelector(".productslist")




const filters = document.querySelectorAll(".options")
filters.forEach(event => {
    event.addEventListener("click", (e) => {
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

            default: clearfilter();
                break;
        }
    })
})

function display(value) {
    value = `./assets/jsonfiles/${value}.json`
    fetch(value)
        .then(response => response.json())
        .then(item => {
            container.innerHTML = ""
            item.forEach(data => {

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
                button.textContent = "Add to Cart"

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

            })
        })
}















logoutbtn.addEventListener("click", () => {
    document.querySelector(".mainpage").classList.remove("hide")
    document.querySelector(".loginpage").classList.add("hide")
})