//
// CONFIGURE
//

// CONFIGURE -> CONNECT
const title = connect("title");
const description = connect("description");

// CONFIGURE -> TITLE
function setTitle(name) {
    title.innerText = name;
}

// CONFIGURE -> DESCRIPTION
function setDescription(name) {
    description.innerText = name;
}


//
// MOVEMENT
//

// MOVEMENT -> TIMER
let timer;

// MOVEMENT -> DETECTION
let topbarState = false
window.addEventListener('mousemove', function(event) {
    if (topbarState) {
        var topbarStateChange = !(event.clientY <= window.innerWidth * 0.05)
    } else {
        var topbarStateChange = event.clientY <= window.innerWidth * 0.05;
    }
    if (topbarStateChange) {
        topbarState = !topbarState
        if (topbarState) {
            clearTimeout(timer);
            title.style.fontSize = "1.5vw";
            title.style.margin = "0.9vw 0 0.9vw 0";
            description.style.opacity = "1";
        } else {
            timer = setTimeout(() => {
                title.style.fontSize = "2vw";
                title.style.margin = "1vw 0 1vw 0";
                description.style.opacity = "0";
            }, 2000);
        }
    }
})