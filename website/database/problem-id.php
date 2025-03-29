<?php
// IMPORTS
include "../modules/environment.php";

// RESPONSE SET TO JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// CONFIGURE VARIABLES
$envVariables = loadEnvVariables(["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME"]);
$host = $envVariables["DB_HOST"];
$user = $envVariables["DB_USER"];
$password = $envVariables["DB_PASSWORD"];
$database = $envVariables["DB_NAME"];

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