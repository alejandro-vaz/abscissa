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

// CHECK ARGUMENT
test('/^[a-z]{2}$/', $ARG["LANG"], "LANG");

// GET TOTAL NUMBER OF PROBLEMS
$total = intval((database_request('SELECT COUNT(*) as total FROM problems', $database)->fetch_assoc())['total']);

// GET PROBLEM NUMBER
$number = rand(0, $total - 1);

// GET PROBLEM AND PRINT
$result = database_request("SELECT * FROM problems LIMIT $number, 1", $database);
echo json_encode(json_decode(($result->fetch_all(MYSQLI_ASSOC))[0]['data_' . $ARG['LANG']], true));

// CLOSE CONNECTION
$database->close();
?>
