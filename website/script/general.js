// CONNECT TO ELEMENTS
const navbarSearch = document.getElementById("navbarSearch")
const navbarLogo = document.getElementById("navbarLogo")

// SEARCH REDIRECTS TO SEARCH
navbarSearch.addEventListener("click", function() {
    redirect("search")
})

// LOGO REDIRECTS TO MAIN
navbarLogo.addEventListener("click", function() {
    redirect("main")
})

// REDIRECT FUNCTION
function redirect(target) {
    window.location.href = `./${target}.php`
}
