// LISTEN TO CLICK OR ENTER AND EXECUTE SEARCH
document.getElementById('searchButton').addEventListener('click', search);
document.getElementById('searchId').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        search()
    }
})

// SEARCH FUNCTION
function search() {
    // GET ID
    const searchId = document.getElementById('searchId').value;
    // ALERT IF IT IS NOT SIX DIGITS OR UPPERCASE LETTERS
    if (!/^[A-Z0-9]{6}$/.test(searchId)) {
        alert('Please enter a valid ID (6 uppercase letters or digits).');
        return;
    }
    // CALL QUERY.PHP AND PROCESS DATA
    fetch(`../db/query.php?id=${encodeURIComponent(searchId)}`)
        .then(response => response.json())
        .then(data => {
            // GET AND ERASE CONTENT DIV
            const resultsDiv = document.getElementById('content');
            resultsDiv.innerHTML = '';
            // INSERT TEXTDESCRIPTION INTO H2
            if (data.textDescription) {
                resultsDiv.style.borderWidth = "5px"
                const header = document.createElement('h2');
                header.className = "content-title"
                header.innerHTML = `<span class="content-title-light">(#${searchId})</span> ${data.textDescription}`;
                resultsDiv.appendChild(header);
            }
            // PARSE INSTRUCTIONS
            if (data.latexInstructions) {
                const instructionsHeader = document.createElement('h3');
                instructionsHeader.textContent = "Instructions";
                instructionsHeader.className = "content-institle"
                resultsDiv.appendChild(instructionsHeader);
                const instructionsDiv = document.createElement('div');
                instructionsDiv.className = "content-instructions";
                instructionsDiv.innerHTML = data.latexInstructions;
                resultsDiv.appendChild(instructionsDiv);
            }
            // ALL SOLUTIONS DIV
            if (data.latexSolutions && typeof data.latexSolutions === 'object') {
                const solutionsContainer = document.createElement('div');
                solutionsContainer.className = "content-solutions";
                Object.entries(data.latexSolutions).forEach(([solution, proof]) => {
                    // ONE-PAIR SUBDIV
                    const solutionProofDiv = document.createElement('div');
                    solutionProofDiv.className = "content-solutions-div";
                    // SOLUTION SUBSECTION
                    const solutionSection = document.createElement('div');
                    solutionSection.className = "content-solutions-solution";
                    solutionSection.innerHTML = `<h4>Solution</h4> <div>${solution}</div>`;
                    solutionProofDiv.appendChild(solutionSection);
                    // PROOF SUBSECTION
                    const proofSection = document.createElement('div');
                    proofSection.className = "content-solutions-proof";
                    proofSection.innerHTML = `<h4>Proof</h4> <div>${proof}</div>`;
                    solutionProofDiv.appendChild(proofSection);
                    // APPEND PAIR DIV
                    solutionsContainer.appendChild(solutionProofDiv);
                });
                // APPEND ALL DIV
                resultsDiv.appendChild(solutionsContainer);
            }
        });
}

