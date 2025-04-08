<?php
// HANDLER
require_once "../modules/handler.php";

// IMPORTS
add("arguments");
add("environment");
add("database");
add("test");

// RESPONSE SET TO JSON FROM ANYONE
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// CONNECT TO THE DATABASE
$database = database_connect($ENV["DB_HOST"], $ENV["DB_USER"], $ENV["DB_PASSWORD"], $ENV["DB_NAME"]);

// CHECK ARGUMENTS
test('/^[A-Z0-9]{4}$/', $ARG["NODE"], "NODE");
test('/^[a-z]{2}$/', $ARG['LANG'], "LANG");

// DUMP, PROCESS AND PRINT DATA
$result = database_request('SELECT * FROM problems WHERE node LIKE "%' . $ARG["NODE"] . '%"', $database);
$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = json_decode($row["data_" . $ARG["LANG"]], true);
}
echo json_encode($data);

// CLOSE CONNECTION
$database->close();
?>
