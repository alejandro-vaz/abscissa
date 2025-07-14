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
const observer = new MutationObserver(mutations => {
    let needsUpdate = false;
    for (const mutation of mutations) {
        if (mutation.type === 'childList') {
            for (const node of mutation.addedNodes) {
                if (
                    node.nodeName === 'TITLE' ||
                    (node.nodeName === 'META' && (node instanceof HTMLMetaElement) && node.name === 'description')
                ) {
                    needsUpdate = true;
                }
            }
            for (const node of mutation.removedNodes) {
                if (
                    node.nodeName === 'TITLE' ||
                    (node.nodeName === 'META' && (node instanceof HTMLMetaElement) && node.name === 'description')
                ) {
                    needsUpdate = true;
                }
            }
        }
        if (mutation.type === 'characterData') {
            const parent = mutation.target.parentNode;
            if (parent && parent.nodeName === 'TITLE') {
                needsUpdate = true;
            }
        }
        if (mutation.type === 'attributes') {
            const target = mutation.target;
            if (
                target.nodeName === 'META' &&
                (target instanceof HTMLMetaElement) &&
                target.name === 'description' &&
                mutation.attributeName === 'content'
            ) {
                needsUpdate = true;
            }
        }
    }
    if (needsUpdate) {
        title.innerText = document.title;
        description.innerText = document.querySelector('meta[name="description"]')?.getAttribute('content');
    }
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
    General.inject(topbar,
        <>
            <link rel="stylesheet" href="public/modules/interface/topbar/style.css"/>
            <h1 id="title" ref={(node) => {
                title = node;
            }}></h1>
            <p id="description" ref={(node) => {
                description = node;
            }}></p>
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