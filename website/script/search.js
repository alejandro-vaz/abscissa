// CONNECT TO ELEMENTS
const searchInput = document.getElementById('searchInput')
const searchButton = document.getElementById("searchButton")
const content = document.getElementById("content")

// LISTEN TO CLICK OR ENTER AND EXECUTE SEARCH
searchButton.addEventListener('click', search);
searchInput.addEventListener('keydown', function(pressed) {
    if (pressed.key === 'Enter') {
        search()
    }
})

// SEARCHINPUT ALWAYS UPPERCASE
document.addEventListener('DOMContentLoaded', () => {
    searchInput.addEventListener("input", () => {
        searchInput.value = searchInput.value.toUpperCase()
    })
})

// SEARCH FUNCTION
function search() {
    // GET ID
    const id = searchInput.value;
    // ALERT IF IT IS NOT SIX DIGITS OR UPPERCASE LETTERS
    if (!/^[A-Z0-9]{6}$/.test(id)) {
        alert('Please enter a valid ID (6 => A-Z, 0-9).');
        return;
    }
    // CALL SEARCH-ID.PHP AND PROCESS DATA
    fetch(`../database/problem-id.php?id=${encodeURIComponent(searchInput.value)}&lang=en`)
        .then(response => response.json())
        .then(data => {
            // ERASE CONTENT
            content.innerHTML = '';
            // ADD NAME
            const header = document.createElement('h2');
            header.id = "contentName"
            header.innerHTML = `<span class="text-light">(#${searchInput.value})</span> ${data.name}`;
            content.appendChild(header);
            // PARSE INSTRUCTIONS
            const instructions = document.createElement('div');
            instructions.id = "contentInstructions";
            instructions.innerHTML = data.instructions;
            content.appendChild(instructions);
            // BUTTON
            const contentButton = document.createElement('button')
            contentButton.className = "input-button"
            contentButton.id = "contentButton"
            contentButton.textContent = "Show solution"
            content.append(contentButton)
            // ON BUTTON CLICKED
            contentButton.addEventListener('click', () => {
                // REMOVE BUTTON AND CREATE SOLUTION DIV
                contentButton.remove()
                const contentSolution = document.createElement('div');
                contentSolution.id = "contentSolution";
                content.appendChild(contentSolution);
                // SOLUTION SECTION
                const solutionSection = document.createElement('div');
                solutionSection.id = "contentSolutionSolution";
                solutionSection.innerHTML = `<div>${data.solution}</div>`;
                contentSolution.appendChild(solutionSection);
                // HR
                const hr = document.createElement("hr");
                contentSolution.appendChild(hr)
                // PROOF SECTION
                const proofSection = document.createElement('div');
                proofSection.className = "contentSolutionProof";
                proofSection.innerHTML = `<div>${data.proof}</div>`;
                contentSolution.appendChild(proofSection);
            })
        })
        .catch(error => {
            alert(error);
            return;
        });
}

