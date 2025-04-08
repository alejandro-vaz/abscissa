<?php 
// HANDLER
require_once "../modules/handler.php";

// IMPORTS
add("arguments");
add("environment");
add("database");
add("test");

// RESPONSE SET TO JSON FROM ANYONE
header('Content-Type: text/plain');
header('Access-Control-Allow-Origin: *');

// CONNECT TO THE DATABASE
$database = database_connect($ENV["DB_HOST"], $ENV["DB_USER"], $ENV["DB_PASSWORD"], $ENV["DB_NAME"]);

// CHECK ARGUMENT
test('/^[a-z]{1,16}$/', $ARG["TYPE"], "TYPE");

// GET TOTAL NUMBER OF RESOURCES
$total = intval((database_request('SELECT COUNT(*) AS total FROM resources WHERE type = "' . $ARG["TYPE"] . '"', $database)->fetch_assoc())['total']);

// GET RESOURCE NUMBER
$number = rand(0, $total - 1);

// GET RESOURCE AND PRINT
$result = database_request('SELECT * FROM resources WHERE type = "' . $ARG["TYPE"] . '" LIMIT ' . $number  . ", 1", $database);
echo ($result->fetch_all(MYSQLI_ASSOC))[0]['link']
?>