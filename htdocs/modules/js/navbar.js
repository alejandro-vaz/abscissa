// CONNECT TO ELEMENTS
const navbarLogo = document.getElementById("navbarLogo")
const navbarSearch = document.getElementById("navbarSearch")

// LOGO REDIRECTS TO MAIN
navbarLogo.addEventListener("click", function() {
    redirect("dashboard.php")
})

// SEARCH REDIRECTS TO SEARCH
navbarSearch.addEventListener("click", function() {
    redirect("search.php")
})
