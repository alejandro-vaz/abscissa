//
//  LOGIC
//

// LOGIC -> CONNECT
const tooltip = connect("tooltip");

// LOGIC -> TIMER
let timer;

// LOGIC -> APPEAR
document.addEventListener("mouseover", (event) => {
    const target = event.target.closest("[tooltip]");
    if (target) {
        timer = setTimeout(() => {
            tooltip.textContent = target.getAttribute("tooltip");
            tooltip.style.opacity = 1;
        }, 1000);
    }
});

// LOGIC -> DISAPPEAR
document.addEventListener("mouseout", (event) => {
    const target = event.target.closest("[tooltip]");
    if (target) {
        clearTimeout(timer);
        tooltip.style.opacity = 0;
    }
});