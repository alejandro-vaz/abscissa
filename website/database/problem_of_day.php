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

// GET ARGUMENT
$searchLang = $_GET['lang'] ?? '';

// CHECK ARGUMENT
if (!preg_match('/^[a-z]{2}$/', $searchLang)) {
    throw new regexException("searchLang");
}

// GET TOTAL NUMBER OF PROBLEMS
$countQuery = 'SELECT COUNT(*) as total FROM problems';
$countResult = $database->query($countQuery);
$countRow = $countResult->fetch_assoc();
$total = intval($countRow['total']);

// DETERMINE THE PROBLEM OF THE DAY
$today = date('Y-m-d');
$seed = crc32($today);
$offset = $seed % $total;

// SELECT THE PROBLEM USING THE CALCULATED OFFSET
$problemQuery = "SELECT * FROM problems LIMIT $offset, 1";
$problemResult = $database->query($problemQuery);

// RETURN NOTHING IF THERE'S NOTHING
if (!$problemResult || $problemResult->num_rows == 0) {
    echo json_encode([]);
    exit;
}

// GET THE LANGUAGE-SPECIFIC DATA FIELD
$row = $problemResult->fetch_assoc();
$field = 'data_' . $searchLang;
if (isset($row[$field])) {
    $decoded = json_decode($row[$field], true);
    echo json_encode($decoded);
} else {
    echo json_encode([]);
}

// CLOSE CONNECTION
$database->close();
?>
