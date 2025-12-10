const logoutbtn = document.querySelector(".username")





















logoutbtn.addEventListener("click",()=>{
    document.querySelector(".mainpage").classList.remove("hide")
    document.querySelector(".loginpage").classList.add("hide")
})