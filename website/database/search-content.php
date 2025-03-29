<?php
// RESPONSE SET TO JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// LOAD DATABASE DETAILS
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
            $$key = $value;
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
$searchContent = $_GET['content'] ?? '';
$searchLanguage = $_GET['lang'] ?? '';

// PREPARES QUERY
$searchQuery = 'SELECT * FROM problems WHERE content LIKE ?';
$stmt = $connection->prepare($searchQuery);

// BINDS PARAMETER WITH WILDCARD FOR SEARCH
$searchPattern = '%' . $searchContent . '%';
$stmt->bind_param('s', $searchPattern);

// EXECUTES QUERY
$stmt->execute();

// GETS QUERY RESULTS
$result = $stmt->get_result();

// INITIALIZE DATA VARIABLE
$data = [];

// ADD MATCHING ROWS TO DATA
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $dataField = 'data_' . $searchLanguage;
        if (isset($row[$dataField])) {
            $decodedData = json_decode($row[$dataField], true);
            if ($decodedData !== null) {
                $data[$row['id']] = $decodedData;
            }
        }
    }
}

// RETURN DATA AS JSON
echo json_encode($data);

// CLOSE CONNECTION AND END
$stmt->close();
$connection->close();
?>
