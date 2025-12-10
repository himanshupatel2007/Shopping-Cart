const myform = document.querySelector("#MyForm")
const submitbutton = document.querySelector(".submitbtn")
const loginform = document.querySelector(".login")
const signupform = document.querySelector(".signup")
const eye = document.querySelector(".eye")
const passvalue = document.querySelector("#Passcode")
let forminputtype = "Login"


//defining for login
loginform.addEventListener("click", (event) => {
    event.preventDefault();
    loginform.classList.add("activated")
    signupform.classList.remove("activated")
    forminputtype = "Login"
})

//defining for sign up
signupform.addEventListener("click", (event) => {
    event.preventDefault();
    signupform.classList.add("activated")
    loginform.classList.remove("activated")
    forminputtype = "SignUp"
})


//event listner for show/hide password
eye.addEventListener("click", (event) => {
    event.preventDefault()
    const pass = document.querySelector("#Passcode")
    if (pass.type == "password") {
        pass.type = "text"
        eye.textContent = "🔓"
    }
    else {
        pass.type = "password"
        eye.textContent = "🔒"
    }
})

//function to perform when submit button pressed
submitbutton.addEventListener("click", (event) => {
    event.preventDefault();
    const userValue = document.getElementById('UserName').value;
    const passValue = document.getElementById('Passcode').value;

    if (userValue == "" || userValue.length < 8) {
        window.alert("Username must be 8 characters long")
        return 0;
    }
    else if (passValue == "" || passValue.length < 4) {
        window.alert("Password must be 4 characters long")
        return 0;
    }

    if (forminputtype == "Login") {
        let username = document.getElementById('UserName').value
        let password = document.getElementById('Passcode').value
        const existingUsers = JSON.parse(localStorage.getItem('User'));
        if (existingUsers.username == username && existingUsers.password == password) {
            openwebsite();
        }
        else {
            window.alert("No user found")
            return;
        }
    }
    else {
        const User = {
            username: document.getElementById('UserName').value,
            password: document.getElementById('Passcode').value
        };
        localStorage.setItem('User', JSON.stringify(User));
        openwebsite();
    }
})

function openwebsite() {
    console.log("website logged in")
    document.querySelector(".loginpage").classList.add("hide")
}




