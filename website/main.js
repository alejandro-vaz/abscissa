document.getElementById('searchButton').addEventListener('click', handleSearch);

// SEARCH FUNCTION
function handleSearch() {
    // GET SEARCH ID
    const searchId = document.getElementById('searchId').value;

    // ALERT IF IT IS EMPTY
    if (!searchId) {
        alert('Please enter an ID to search.');
        return;
    }

    // CALL QUERY.PHP
    fetch(`query.php?id=${encodeURIComponent(searchId)}`)
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('content');
            resultsDiv.innerHTML = ''; // Clear previous content

            // Create an h2 for "textDescription"
            if (data.textDescription) {
                const header = document.createElement('h2');
                header.textContent = data.textDescription;
                resultsDiv.appendChild(header);
            }

            // Create a p with class "latex" for "latexInstructions" and apply >>latex
            if (data.latexInstructions) {
                const latexInstructions = document.createElement('p');
                latexInstructions.innerHTML = processInlineLatex(data.latexInstructions);
                resultsDiv.appendChild(latexInstructions);
            }

            // Create a ul for "ilatexSolutions" and apply >>latex to each item
            if (Array.isArray(data.ilatexSolutions)) {
                const solutionsList = document.createElement('ul');
                data.ilatexSolutions.forEach(solution => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = processLatex(solution);
                    solutionsList.appendChild(listItem);
                });
                resultsDiv.appendChild(solutionsList);
            }

            // Create a ul for "ilatexProofs" and apply >>latex to each item
            if (Array.isArray(data.ilatexProofs)) {
                const proofsList = document.createElement('ul');
                data.ilatexProofs.forEach(proof => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = processLatex(proof);
                    proofsList.appendChild(listItem);
                });
                resultsDiv.appendChild(proofsList);
            }
        });
}

// Function to process >>latex
function processLatex(input) {
    return input.replace(/\$(.+?)\$/g, '<div class="latex">$1</div>');
}

function processInlineLatex(input) {
    // Replace $...$ with <span class="latex">...</span>, preserving line breaks
    return input
        .replace(/\n/g, '<br>')
        .replace(/\$(.+?)\$/g, '<span class="latex">$1</span>');
}