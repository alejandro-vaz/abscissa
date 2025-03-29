<?php
// RESPONSE SET TO JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Load .env file manually
$envPath = __DIR__ . '/../.env';
if (file_exists($envPath)) {
    $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        // Skip comments
        if (strpos(trim($line), '#') === 0) {
            continue;
        }
        // Parse key=value pairs
        list($key, $value) = explode('=', $line, 2);
        $key = trim($key);
        $value = trim($value);
        if (!empty($key) && !empty($value)) {
            $$key = $value; // Dynamically define variables like $DB_HOST, $DB_USER, etc.
        }
    }
}

// DATABASE CONNECTION DETAILS
$host = $DB_HOST ?? 'localhost';
$user = $DB_USER ?? 'root';
$password = $DB_PASSWORD ?? '';
$database = $DB_NAME ?? '';

// CONNECTS TO THE DATABASE
$connection = new mysqli($host, $user, $password, $database);

// CHECKS THE CONNECTION
if ($connection->connect_error) {
    echo json_encode(['error' => 'Connection failed: ' . $connection->connect_error]);
    exit;
}

// GET ARGUMENTS
$searchValue = $_GET['id'] ?? '';
$searchLanguage = $_GET['lang'] ?? '';

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
    $dataField = 'data_' . $searchLanguage;
    if (isset($data[0][$dataField])) {
        echo $data[0][$dataField];
    }
}

// CLOSE CONNECTION AND END
$stmt->close();
$connection->close();
?>