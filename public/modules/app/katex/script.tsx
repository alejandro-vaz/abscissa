//
//  HEAD
//

// HEAD -> MODULES
// @ts-nocheck
import * as General from "../../../content/general.js";
import * as KaTeX from 'katex/contrib/auto-render';


//                                                                            
//  RENDERING                                                                 
//                                                                            

// RENDERING -> ELEMENT
export function render(element: HTMLElement): void {
    KaTeX(element, {
        delimiters: [
            {left: "$$", right: "$$", display: true},
            {left: "$", right: "$", display: false}
        ],
        strict: false,
        throwOnError: false,
    });
}

// RENDERING -> OBSERVER
if (General.ismain("katex")) {
    document.addEventListener("DOMContentLoaded", function(): void {
        render(document.body);
        const observer = new MutationObserver(function(changeList: MutationRecord[]): void {
            for (const change of changeList) {
                if (change.type === 'childList') {
                    change.addedNodes.forEach(node => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            render(node as HTMLElement);
                        }
                    });
                }
            }
        });
        observer.observe(document.body, { 
            childList: true, 
            subtree: true 
        });
    })
}