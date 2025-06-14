//
// LOCATION
//

// LOCATION -> CONNECT TO CONTAINER
const navbar = connect("navbar-container");

// LOCATION -> CONNECT TO ICONS
const backIcon = connect("navbar-back");
const dashboardIcon = connect("navbar-dashboard");
const searchIcon = connect("navbar-search");
const playgroundIcon = connect("navbar-playground");
const statsIcon = connect("navbar-stats");
const userIcon = connect("navbar-user");
const settingsIcon = connect("navbar-settings");

// LOCATION -> CHANGE CURRENT 
const currentIcon = {
    dashboard: dashboardIcon,
    search: searchIcon,
    playground: playgroundIcon,
    stats: statsIcon,
    user: userIcon,
    settings: settingsIcon
}[window.location.pathname.split("/").pop()];
if (currentIcon) {
    currentIcon.className = "navbarCurrent";
    currentIcon.onclick = null;
}

// LOCATION -> BACK BUTTON
if (window.location.pathname.split("/").length > 2) {
    backIcon.style.display = "block";
}

// LOCATION -> OPEN AND CLOSE
let navbarState = true
window.addEventListener('mousemove', function(event) {
    if (navbarState) {
        var navbarStateChange = !(event.clientX <= window.innerWidth * 0.06)
    } else {
        var navbarStateChange = event.clientX <= window.innerWidth * 0.01;
    }
    if (navbarStateChange) {
        navbarState = !navbarState
        if (navbarState) {
            navbar.style.left = "1vw"
        } else {
            navbar.style.left = "-3.5vw"
        }
    }
})