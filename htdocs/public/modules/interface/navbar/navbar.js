/*                                                                           */
/* NAVBAR                                                                    */
/*                                                                           */

// NAVBAR -> CONNECTIONS
const navbarLogo = document.getElementById("navbar-logo");
const navbarSearch = document.getElementById("navbar-search");
const navbarPlayground = document.getElementById("navbar-playground");

// NAVBAR -> REDIRECTIONS
navbarLogo.addEventListener("click", function() {
    redirect("dashboard")
})
navbarSearch.addEventListener("click", function() {
    redirect("search")
})
navbarPlayground.addEventListener("click", function() {
    redirect("playground")
})