//
//  HEAD
//

// HEAD -> MODULES
import * as General from "../../../content/general.js";


//
//  LOGIC
//

// LOGIC -> CONNECT
const tooltip = General.connect("tooltip");

// LOGIC -> TIMER
let timer;

// LOGIC -> APPEAR
document.addEventListener("mouseover", function(event: Event): void {
    const target = (event.target as HTMLElement)?.closest("[tooltip]");
    if (target) {
        timer = setTimeout(function(): void {
            tooltip.textContent = target.getAttribute("tooltip");
            tooltip.style.opacity = "1";
        }, 0);
    }
});

// LOGIC -> DISAPPEAR
document.addEventListener("mouseout", (event: Event) => {
    if ((event.target as HTMLElement)?.closest("[tooltip]")) {
        clearTimeout(timer);
        tooltip.style.opacity = "0";
    }
});
