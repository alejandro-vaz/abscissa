// CONNECT TO ELEMENTS
const navbarLogo = document.getElementById("navbarDefaultLogo")
const navbarSearch = document.getElementById("navbarSearch")
const navbarAbout = document.getElementById("navbarAbout")

// LOGO REDIRECTS TO MAIN
navbarLogo.addEventListener("click", function() {
    redirect("main")
})

// SEARCH REDIRECTS TO SEARCH
navbarSearch.addEventListener("click", function() {
    redirect("search")
})

// ABOUT REDIRECTS TO ABOUT
navbarAbout.addEventListener("click", function() {
    redirect("about")
})