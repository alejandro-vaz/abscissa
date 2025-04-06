<?php
// HANDLER
require_once "../modules/handler.php";

// IMPORTS
add("environment");
add("exceptions");

// RESPONSE SET TO JSON FROM ANYONE
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// CONFIGURE ENVIRONMENT
$env = load(["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME"]);
$DB_HOST = $env["DB_HOST"];
$DB_USER = $env["DB_USER"];
$DB_PASSWORD = $env["DB_PASSWORD"];
$DB_NAME = $env["DB_NAME"];

// CONNECT TO THE DATABASE
$database = new mysqli($DB_HOST, $DB_USER, $DB_PASSWORD, $DB_NAME);

// CHECKS THE CONNECTION
if ($database->connect_error) {
    throw new databaseConnectException("");
}

// GET ARGUMENTS
$searchId = $_GET['id'] ?? '';
$searchLang = $_GET['lang'] ?? '';

// CHECKS ARGUMENTS
if (!preg_match('/^[A-Z0-9]{6}$/', $searchId)) {
    throw new regexException("searchId");
}
if (!preg_match('/^[a-z]{2}$/', $searchLang)) {
    throw new regexException("searchLang");
}

// MAKES QUERY REQUEST
$searchQuery = 'SELECT * FROM problems WHERE id = ?';
$request = $database->prepare($searchQuery);
$request->bind_param('s', $searchId);
$request->execute();
$result = $request->get_result();

// RETURN FIRST FIELD
$data = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    // EXTRACT FIRST DATA FIELD AND RETURN IT AS JSON
    $field = 'data_' . $searchLang;
    if (isset($data[0][$field])) {
        $decoded = json_decode($data[0][$field], true);
        echo json_encode($decoded);
    }
}

// CLOSE CONNECTION
$request->close();
$database->close();
?>