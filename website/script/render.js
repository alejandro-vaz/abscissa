// RENDER MATH FUNCTION
function render(element) {
    renderMathInElement(element, {
        delimiters: [
            {left: "$$", right: "$$", display: true},
            {left: "$", right: "$", display: false}
        ]
    });
}

// RENDERING
document.addEventListener("DOMContentLoaded", function() {
    // INITIAL RENDERING
    render(document.body);
    // OBSERVER FOR DYNAMIC CHANGES RENDERING
    const observer = new MutationObserver(function(mutationsList) {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        render(node);
                    }
                });
            }
        }
    });
    // START OBSERVING BODY
    observer.observe(document.body, { childList: true, subtree: true });
});
