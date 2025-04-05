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
$searchContent = $_GET['content'] ?? '';
$searchLang = $_GET['lang'] ?? '';

// CHECKS ARGUMENTS
if (!preg_match('/^[A-Z0-9]{4}$/', $searchContent)) {
    throw new regexException("searchContent");
}
if (!preg_match('^[a-z]{2}$', $searchLang)) {
    throw new regexException("searchLang");
}

// MAKES QUERY REQUEST
$searchQuery = 'SELECT * FROM problems WHERE content LIKE ?';
$request = $database->prepare($searchQuery);
$searchPattern = '%' . $searchContent . '%';
$request->bind_param('s', $searchPattern);
$request->execute();
$result = $request->get_result();

// RETURN MATCHING ROWS
$data = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $field = 'data_' . $searchLang;
        if (isset($row[$field])) {
            $decoded = json_decode($row[$field], true);
            if ($decoded !== null) {
                $data[$row['id']] = $decoded;
            }
        }
    }
}

// RETURN DATA AS JSON
echo json_encode($data);

// CLOSE CONNECTION AND END
$request->close();
$database->close();
?>
