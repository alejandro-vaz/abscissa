// SELECTS ALL LATEX ELEMENTS
const latexViewers = document.querySelectorAll('#latexViewer');

// ITERATES OVER EVERY ELEMENT AND RENDERS IT
latexViewers.forEach((latexViewer) => {
    const latexContent = latexViewer.textContent;
    katex.render(latexContent, latexViewer, {
        throwOnError: false
    });
});