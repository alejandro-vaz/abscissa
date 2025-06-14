//                                                                            
//  UTILITIES                                                                 
//                                                                            

// UTILITIES -> RAW LATEX
function rawLaTeX(latex) {
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
function renderLaTeX(element) {
    renderMathInElement(element, {
        delimiters: [
            {left: "$$", right: "$$", display: true},
            {left: "$", right: "$", display: false}
        ],
        strict: false,
        throwOnError: false,
    });
}

// RENDERING -> OBSERVER
document.addEventListener("DOMContentLoaded", function() {
    renderLaTeX(document.body);
    const observer = new MutationObserver(function(changeList) {
        for (const change of changeList) {
            if (change.type === 'childList') {
                change.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        renderLaTeX(node);
                    }
                });
            }
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
});
