//
//  HEAD
//

// HEAD -> MODULES
import * as General from "../../../content/general.js";

// HEAD -> INTERFACE TOPBAR
const origin = await General.connect("InterfaceTopbar");


//
//  TOPBAR
//

// TOPBAR -> VARIABLES
let title;
let description;
let timer;
let topbarState = true;

// TOPBAR -> MUTATION OBSERVER
const observer = new MutationObserver(() => {
    title.innerText = General.SUG.TIT;
    description.innerText = General.SUG.DES;
})

// TOPBAR -> OPENER FUNCTION
function alternate(event: MouseEvent): void {
    let topbarStateChange;
    if (topbarState) {
        topbarStateChange = !(event.clientY <= window.innerWidth * 0.045)
    } else {
        topbarStateChange = event.clientY <= window.innerWidth * 0.045;
    }
    if (topbarStateChange) {
        topbarState = !topbarState;
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
            }, 0);
        }
    }
}

// TOPBAR -> ACTIVATE
export async function activate(): Promise<void> {
    title = undefined;
    description = undefined;
    timer = undefined;
    topbarState = true;
    await General.inject(origin,
        <>
            <h1 id="Title" ref={(node) => {title = node}}></h1>
            <p id="Description" ref={(node) => {description = node}}></p>
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
export async function deactivate(): Promise<void> {
    observer.disconnect();
    window.removeEventListener("mousemove", alternate);
    General.inject(origin, <></>);
}