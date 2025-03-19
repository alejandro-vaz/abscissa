// LISTEN TO BUTTON
document.getElementById('searchButton').removeEventListener('click', handleSearch); 
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
            // SELECT DIV
            const resultsDiv = document.getElementById('results');
            // ERASE DIV
            resultsDiv.innerHTML = '';
            // CHECK ERRORS, MESSAGES OR PRINT
            if (data.error) {
                resultsDiv.textContent = data.error;
            } else if (data.message) {
                resultsDiv.textContent = data.message;
            } else {
                // CREATES UNORDERED LIST
                const list = document.createElement('ul');
                // ITERATES OVER ALL ROWS
                data.forEach(row => {
                    // CREATES A LIST ITEM
                    const listItem = document.createElement('li');
                    // CONVERT TO JSON STRING
                    listItem.textContent = JSON.stringify(row);
                    // APPENDS IT TO THE LIST ITEM
                    list.appendChild(listItem);
                });
                // APPENDS THE LIST
                resultsDiv.appendChild(list);
            }
        })
        // CATCH ERROR
        .catch(error => {
            console.error('Error:', error);
        });
}