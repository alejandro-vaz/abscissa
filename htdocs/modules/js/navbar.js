/*                                                                           */
/* NAVBAR                                                                    */
/*                                                                           */

// NAVBAR -> CONNECTIONS
const navbarLogo = document.getElementById("navbar-logo");
const navbarSearch = document.getElementById("navbar-search");

// NAVBAR -> REDIRECTIONS
navbarLogo.addEventListener("click", function() {
    redirect("dashboard.php")
})
navbarSearch.addEventListener("click", function() {
    redirect("search.php")
})