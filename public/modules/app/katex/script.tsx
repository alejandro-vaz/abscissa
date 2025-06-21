//
//  HEAD
//

// HEAD -> MODULES
import * as General from "../../../content/general.js";
import * as LaTeX from 'katex/contrib/auto-render';


//                                                                            
//  UTILITIES                                                                 
//                                                                            

// UTILITIES -> RAW LATEX
export function rawLaTeX(latex: string): string {
    return latex
    .replaceAll("\\\\", "\\")
    .replaceAll("\\right", "")
    .replaceAll("\\left", "")
    .replaceAll("\\cdot", "")
    .replaceAll("{", "")
    .replaceAll("}", "")
    .replaceAll("*", "")
    .replaceAll("\\\\", "")
    .replaceAll(" ", "")
    .trim()
}


//                                                                            
//  RENDERING                                                                 
//                                                                            

// RENDERING -> ELEMENT
export function render(element: HTMLElement): void {
    LaTeX(element, {
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