// RENDER MATH FUNCTION
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

// RENDERING
document.addEventListener("DOMContentLoaded", function() {
    // INITIAL RENDERING
    renderLaTeX(document.body);
    // OBSERVER FOR DYNAMIC CHANGES RENDERING
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
    // START OBSERVING BODY
    observer.observe(document.body, { childList: true, subtree: true });
});
