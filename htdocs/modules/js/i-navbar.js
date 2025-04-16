// CONNECT TO ELEMENTS
const navbarLogo = document.getElementById("navbar-logo");
const navbarSearch = document.getElementById("navbar-search");

// LOGO REDIRECTS TO MAIN
navbarLogo.addEventListener("click", function() {
    redirect("dashboard.php")
})

// SEARCH REDIRECTS TO SEARCH
navbarSearch.addEventListener("click", function() {
    redirect("search.php")
})
