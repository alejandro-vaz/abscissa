// RENDER MATH FUNCTION
function renderLaTeX(element, source) {
    renderMathInElement(element, {
        delimiters: [
            {left: "$$", right: "$$", display: true},
            {left: "$", right: "$", display: false}
        ],
        strict: false,
        throwOnError: false,
        errorCallback: function(error) {
            // TO-DO, RELATED TO SOURCE
        }
    });
}

// RENDERING
document.addEventListener("DOMContentLoaded", function() {
    // INITIAL RENDERING
    renderLaTeX(document.body);
    // OBSERVER FOR DYNAMIC CHANGES RENDERING
    const observer = new MutationObserver(function(mutationsList) {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
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
