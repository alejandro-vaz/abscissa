<?php
// IMPORTS
include "../modules/environment.php";

// RESPONSE SET TO JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// CONFIGURE VARIABLES
$envVariables = load(["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME"]);
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
