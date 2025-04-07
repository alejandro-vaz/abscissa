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

// CHECK ARGUMENTS
test('/^[A-Z0-9]{4}$/', $_GET["content"], "content");
test('/^[a-z]{2}$/', $_GET['lang'], "lang");

// MAKES QUERY REQUEST
$result = request('SELECT * FROM problems WHERE content LIKE ?', $_GET['content'], true, $database);

// DUMP AND PROCESS DATA
$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = json_decode($row["data_" . $_GET["lang"]], true);
}
echo json_encode($data);

// CLOSE CONNECTION
$database->close();
?>
