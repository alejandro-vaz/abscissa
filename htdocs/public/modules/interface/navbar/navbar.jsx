//
// LOCATION
//

// LOCATION -> CONNECT
const navbar = connect("navbar-container");

// LOCATION -> INITIAL STATE
let navbarState = true

// LOCATION -> OPEN AND CLOSE
window.addEventListener('mousemove', function(event) {
    if (navbarState) {
        var navbarStateChange = !(event.clientX <= window.innerWidth * 0.06)
    } else {
        var navbarStateChange = event.clientX <= window.innerWidth * 0.02;
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