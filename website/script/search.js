// LISTEN TO CLICK OR ENTER AND EXECUTE SEARCH
document.getElementById('searchButton').addEventListener('click', search);
document.getElementById('searchId').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        search()
    }
})

// SEARCHID TO UPPERCASE
document.addEventListener('DOMContentLoaded', () => {
    const searchIdInput = document.getElementById('searchId');
    searchIdInput.addEventListener("input", () => {
        searchIdInput.value = searchIdInput.value.toUpperCase()
    })
})

// SEARCH FUNCTION
function search() {
    // GET ID
    const searchId = document.getElementById('searchId').value;
    // ALERT IF IT IS NOT SIX DIGITS OR UPPERCASE LETTERS
    if (!/^[A-Z0-9]{6}$/.test(searchId)) {
        alert('Please enter a valid ID (6 -> A-Z, 0-9).');
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
            if (data.latexSolution && data.latexProof) {
                // SHOW SOLUTIONS BUTTON
                const showSolutionButton = document.createElement('button')
                showSolutionButton.className = "input-button"
                showSolutionButton.id = "showSolution"
                showSolutionButton.textContent = "Show Solution"
                resultsDiv.append(showSolutionButton)
                showSolutionButton.addEventListener('click', () => {
                    showSolutionButton.remove()
                    const solutionsContainer = document.createElement('div');
                    solutionsContainer.className = "content-solutions";
                    // SOLUTION SUBSECTION
                    const solutionSection = document.createElement('div');
                    solutionSection.className = "content-solutions-solution";
                    solutionSection.innerHTML = `<h4>Solution</h4> <div>${data.latexSolution}</div>`;
                    solutionsContainer.appendChild(solutionSection);
                    // PROOF SUBSECTION
                    const proofSection = document.createElement('div');
                    proofSection.className = "content-solutions-proof";
                    proofSection.innerHTML = `<h4>Proof</h4> <div>${data.latexProof}</div>`;
                    solutionsContainer.appendChild(proofSection);
                    // APPEND ALL DIV
                    resultsDiv.appendChild(solutionsContainer);
                })
            }
        });
}

