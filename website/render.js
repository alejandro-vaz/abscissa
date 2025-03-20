const renderLatex = (element) => {
    katex.render(element.textContent, element, { throwOnError: false });
};

// INITIAL RENDERING
document.querySelectorAll('.latex').forEach(renderLatex);

// OBSERVE DYNAMICALLY ADDED ELEMENTS
new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.classList.contains('latex')) {
                    renderLatex(node);
                }
                node.querySelectorAll('.latex').forEach(renderLatex);
            }
        });
    });
}).observe(document.body, { childList: true, subtree: true });