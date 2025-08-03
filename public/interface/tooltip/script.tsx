//
//  HEAD
//

// HEAD -> MODULES
import * as $ from "$";

// HEAD -> INTERFACE TOOLTIP
const origin = await $.connect("InterfaceTooltip");


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
        timer = setTimeout(() => {
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
    await $.inject(origin,
        <>
            <p id="Text" ref={(node) => {text = node}}></p>
        </>
    )
    window.addEventListener("mouseover", mouseover);
    window.addEventListener("mouseout", mouseout)
}

// TOOLTIP -> DEACTIVATE
export async function deactivate(): Promise<void> {
    window.removeEventListener("mouseout", mouseout);
    window.removeEventListener("mouseover", mouseover);
    await $.inject(origin, <></>);
}