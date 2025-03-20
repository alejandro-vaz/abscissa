<?php
// RESPONSE IS JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

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

// PREPARES QUERY
$searchQuery = 'SELECT * FROM problems WHERE id = ?';
$stmt = $connection->prepare($searchQuery);

// BINDS STRING PARAMETER TO THE SEARCH VALUE
$stmt->bind_param('s', $searchValue);

// EXECUTES QUERY
$stmt->execute();

// GETS QUERY RESULTS
$result = $stmt->get_result();

// INITIALIZE DATA VARIABLE
$data = [];

// ADD ROWS AND RETURN
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    // EXTRACT FIRST DATA FIELD
    if (isset($data[0]['data'])) {
        echo $data[0]['data'];
    } else {
        echo json_encode(['error' => 'Data field not found.']);
    }
} else {
    echo json_encode(['message' => 'No results found.']);
}

// CLOSE CONNECTION AND END
$stmt->close();
$connection->close();
?>