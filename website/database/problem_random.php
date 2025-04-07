<?php
// HANDLER
require_once "../modules/handler.php";

// IMPORTS
add("environment");
add("database");
add("test");

// RESPONSE SET TO JSON FROM ANYONE
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// CONFIGURE ENVIRONMENT
$ENV = load(["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME"]);

// CONNECT TO THE DATABASE
$database = connect($ENV["DB_HOST"], $ENV["DB_USER"], $ENV["DB_PASSWORD"], $ENV["DB_NAME"]);

// CHECK ARGUMENT
test('/^[a-z]{2}$/', $_GET["lang"], "lang");

// GET TOTAL NUMBER OF PROBLEMS
$total = intval((request('SELECT COUNT(*) as total FROM problems', null, false, $database)->fetch_assoc())['total']);

// GET PROBLEM NUMBER
$number = rand(0, $total - 1);

// GET PROBLEM
$result = request("SELECT * FROM problems LIMIT $number, 1", null, false, $database);

// DUMP AND PROCESS DATA
$data = json_decode(($result->fetch_all(MYSQLI_ASSOC))[0]['data_' . $_GET['lang']], true);
echo json_encode($data);

// CLOSE CONNECTION
$database->close();
?>
