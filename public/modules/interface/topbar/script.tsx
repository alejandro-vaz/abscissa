//
//  HEAD
//

// HEAD -> MODULES
import * as General from "../../../content/general.js";


//
// CONFIGURE
//

// CONFIGURE -> CONNECT
const header = General.connect("title");
const desc = General.connect("description");

// CONFIGURE -> DEFAULTS
header.innerText = document.title;
desc.innerText = document.querySelector('meta[name="description"]')?.getAttribute('content');

// CONFIGURE -> DYNAMICALLY UPDATE DEFAULTS
new MutationObserver(mutations => {
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
        header.innerText = document.title;
        desc.innerText = document.querySelector('meta[name="description"]')?.getAttribute('content');
    }
}).observe(document.head, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: [
        'content'
    ]
});


//
// MOVEMENT
//

// MOVEMENT -> DETECTION
let timer;
let topbarState = false;
window.addEventListener('mousemove', function(event: MouseEvent): void {
    let topbarStateChange;
    if (topbarState) {
        topbarStateChange = !(event.clientY <= window.innerWidth * 0.05)
    } else {
        topbarStateChange = event.clientY <= window.innerWidth * 0.05;
    }
    if (topbarStateChange) {
        topbarState = !topbarState
        if (topbarState) {
            clearTimeout(timer);
            header.style.fontSize = "1.5vw";
            header.style.margin = "0.9vw 0 0.9vw 0";
            desc.style.opacity = "1";
        } else {
            timer = setTimeout(function(): void {
                header.style.fontSize = "2vw";
                header.style.margin = "1vw 0 1vw 0";
                desc.style.opacity = "0";
            }, 0);
        }
    }
})