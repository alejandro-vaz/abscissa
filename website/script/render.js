// RENDER MATH
document.addEventListener("DOMContentLoaded", function() {
    // RENDER DELIMITER-BASED MATH
    function renderMathInElementWithDelimiters(element) {
        renderMathInElement(element, {
            delimiters: [
                {left: "$$", right: "$$", display: true},
                {left: "\\[", right: "\\]", display: true},
                {left: "$", right: "$", display: false},
                {left: "\\(", right: "\\)", display: false}
            ]
        });
    }
    // INITIAL RENDERING
    renderMathInElementWithDelimiters(document.body);
    // OBSERVER FOR DYNAMIC CHANGES RENDERING
    const observer = new MutationObserver(function(mutationsList) {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        renderMathInElementWithDelimiters(node);
                    }
                });
            }
        }
    });
    // START OBSERVING BODY
    observer.observe(document.body, { childList: true, subtree: true });
});
