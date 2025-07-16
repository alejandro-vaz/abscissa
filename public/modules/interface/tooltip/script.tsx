//
//  HEAD
//

// HEAD -> MODULES
import * as General from "../../../content/general.js";

// HEAD -> CONNECTIONS
const tooltip = General.connect("interface-tooltip");


//
//  TOOLTIP
//

// TOOLTIP -> VARIABLES
let timer;
let text;

// TOOLTIP -> MOUSEOVER FUNCTION
function mouseover(event: MouseEvent): void {
    const target = (event.target as HTMLElement)?.closest("[tooltip]");
    if (target) {
        timer = setTimeout(function(): void {
            text.textContent = target.getAttribute("tooltip");
            text.style.opacity = "1";
        }, 0);
    }
}

// TOOLTIP -> MOUSEOUT
function mouseout(event: MouseEvent): void {
    if ((event.target as HTMLElement)?.closest("[tooltip]")) {
        clearTimeout(timer);
        text.style.opacity = "0";
    }
}

// TOOLTIP -> ACTIVATE
export async function activate(): Promise<void> {
    timer = undefined;
    text = undefined;
    await General.inject(tooltip,
        <>
            <p id="interface-tooltip-text" ref={(node: HTMLElement) => {text = node}}></p>
        </>
    )
    window.addEventListener("mouseover", mouseover);
    window.addEventListener("mouseout", mouseout)
}

// TOOLTIP -> DEACTIVATE
export function deactivate(): void {
    window.removeEventListener("mouseout", mouseout);
    window.removeEventListener("mouseover", mouseover);
    General.inject(tooltip, <></>);
}