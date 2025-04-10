// CONNECT TO ELEMENTS
const navbarLogo = document.getElementById("navbarLogo")
const navbarSearch = document.getElementById("navbarSearch")

// REDIRECT FUNCTION
function redirect(target) {
    window.location.href = `./${target}.php`
}

// LOGO REDIRECTS TO MAIN
navbarLogo.addEventListener("click", function() {
    redirect("dashboard")
})

// SEARCH REDIRECTS TO SEARCH
navbarSearch.addEventListener("click", function() {
    redirect("search")
})
