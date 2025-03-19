<?php
// RESPONSE IS JSON
header('Content-Type: application/json');

// DATABASE CONNECTION DETAILS
$host = 'sql211.infinityfree.com';
$user = 'if0_38527601';
$password = '5tvkxPRvO3aWVm';
$database = 'if0_38527601_data';

// CONNECTS TO THE DATABASE
$connection = new mysqli($host, $user, $password, $database);

// CHECKS THE CONNECTION
if ($connection->connect_error) {
    echo json_encode(['error' => 'Connection failed: ' . $connection->connect_error]);
    exit;
}

// GET SEARCH VALUE
$searchValue = $_GET['id'] ?? '';

// RETURNS ERROR IF SEARCH EMPTY
if (empty($searchValue)) {
    echo json_encode(['error' => 'No search value provided.']);
    exit;
}

// PREPARES QUERY
$searchQuery = 'SELECT * FROM problems WHERE id = ?';
$stmt = $connection->prepare($searchQuery);

// THROW ERROR IF ERROR IN SEARCH
if (!$stmt) {
    echo json_encode(['error' => 'Error preparing the statement: ' . $connection->error]);
    exit;
}

// BINDS STRING PARAMETER TO THE SEARCH VALUE
$stmt->bind_param('s', $searchValue);

// EXECUTES QUERY
$stmt->execute();

// GETS QUERY RESULTS
$result = $stmt->get_result();

// INITALIZE DATA VARIABLE
$data = [];

// ADD ROWS AND RETURN
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);
} else {
    echo json_encode(['message' => 'No results found.']);
}

// CLOSE CONNECTION AND END
$stmt->close();
$connection->close();
?>