//
//  HEAD
//

// HEAD -> MODULES
import * as $ from "$";
import * as ß from "ß";

// HEAD -> INTERFACE TOOLTIP
const root = await ß.createRoot("InterfaceTooltip");


//
//  TOOLTIP
//

// TOOLTIP -> VARIABLES
let timer;
let text;

// TOOLTIP -> MOUSEOVER FUNCTION
function mouseover(event: MouseEvent): void {
    const target = (event.target as HTMLElement)?.closest("[data-tooltip]");
    if (target) {
        timer = setTimeout(() => {
            text.textContent = target.getAttribute("data-tooltip");
            text.style.opacity = "1";
        }, 0);
    }
}

// TOOLTIP -> MOUSEOUT
function mouseout(event: MouseEvent): void {
    if ((event.target as HTMLElement)?.closest("[data-tooltip]")) {
        clearTimeout(timer);
        text.style.opacity = "0";
    }
}

// TOOLTIP -> ACTIVATE
export async function activate(): Promise<void> {
    timer = undefined;
    text = undefined;
    await ß.inject(root,
        <p id="Text" ref={ß.mount((node) => {text = node})}></p>
    )
    window.addEventListener("mouseover", mouseover);
    window.addEventListener("mouseout", mouseout)
}

// TOOLTIP -> DEACTIVATE
export async function deactivate(): Promise<void> {
    window.removeEventListener("mouseout", mouseout);
    window.removeEventListener("mouseover", mouseover);
    await ß.clean(root);
}