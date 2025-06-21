//
//  HEAD
//

// HEAD -> MODULES
import * as General from "../../../content/general.js";


//
//  LOCATION
//

// LOCATION -> CONNECT TO CONTAINER
const navbar = General.connect("navbar-container");

// LOCATION -> CONNECT TO ICONS
const backIcon = General.connect("navbar-back");
const dashboardIcon = General.connect("navbar-dashboard");
const searchIcon = General.connect("navbar-search");
const playgroundIcon = General.connect("navbar-playground");
const statsIcon = General.connect("navbar-stats");
const userIcon = General.connect("navbar-user");
const settingsIcon = General.connect("navbar-settings");

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
    (currentIcon as any).tooltip = null;
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