// CONNECT TO ELEMENTS
<<<<<<< HEAD
const navbarLogo = document.getElementById("navbar-logo");
const navbarSearch = document.getElementById("navbar-search");
=======
const navbarLogo = document.getElementById("navbarLogo");
const navbarSearch = document.getElementById("navbarSearch");
>>>>>>> f3e588209e69b6833874ac7cf1da3ed038b85391

// LOGO REDIRECTS TO MAIN
navbarLogo.addEventListener("click", function() {
    redirect("dashboard.php")
})

// SEARCH REDIRECTS TO SEARCH
navbarSearch.addEventListener("click", function() {
    redirect("search.php")
})
