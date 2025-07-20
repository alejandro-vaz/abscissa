//
//  HEAD
//

// HEAD -> MODULES
import * as General from "../../../content/general.js";

// HEAD -> CONNECTIONS
const topbar = General.connect("interface-topbar");


//
//  TOPBAR
//

// TOPBAR -> VARIABLES
let title;
let description;
let timer;
let topbarState = false;

// TOPBAR -> MUTATION OBSERVER
const observer = new MutationObserver(() => {
    title.innerText = General.SUG.TIT;
    description.innerText = General.SUG.DES;
})

// TOPBAR -> OPENER FUNCTION
function alternate(event: MouseEvent): void {
    let topbarStateChange;
    if (topbarState) {
        topbarStateChange = !(event.clientY <= window.innerWidth * 0.05)
    } else {
        topbarStateChange = event.clientY <= window.innerWidth * 0.05;
    }
    if (topbarStateChange) {
        topbarState = !topbarState;
        if (topbarState) {
            clearTimeout(timer);
            title.style.fontSize = "1.5vw";
            title.style.margin = "0.9vw 0 0.9vw 0";
            description.style.opacity = "1";
        } else {
            timer = setTimeout(function(): void {
                title.style.fontSize = "2vw";
                title.style.margin = "1vw 0 1vw 0";
                description.style.opacity = "0";
            }, 0);
        }
    }
}

// TOPBAR -> ACTIVATE
export async function activate(): Promise<void> {
    title = undefined;
    description = undefined;
    timer = undefined;
    topbarState = false;
    await General.inject(topbar,
        <>
            <h1 id="interface-topbar-title" ref={(node: HTMLElement) => {title = node}}></h1>
            <p id="interface-topbar-description" ref={(node: HTMLElement) => {description = node}}></p>
        </>
    )
    window.addEventListener("mousemove", alternate);
    observer.observe(document.head, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: [
            'content'
        ]
    });
}

// TOPBAR -> DEACTIVATE
export function deactivate(): void {
    observer.disconnect();
    window.removeEventListener("mousemove", alternate);
    General.inject(topbar, <></>);
}