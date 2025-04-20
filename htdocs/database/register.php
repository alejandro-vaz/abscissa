<?php 
// HANDLER
require_once "../modules/.php";

// IMPORTS
module("functional", "check");
module("functional", "cryptography");
module("functional", "database");
module("functional", "environment");
module("functional", "post");

// SIGNAL
signal("functional");

// RESPONSE SET TO JSON FROM ANYONE
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// CONNECT TO THE DATABASE
$database = database_connect($ENV["DB_HOST"], $ENV["DB_USER"], $ENV["DB_PASSWORD"], $ENV["DB_NAME"]);

// CHECK ARGUMENTS
check('/^[A-Za-z0-9._%\-]+@gmail.com$/', $PST["EMAIL"], "EMAIL");
check('/^[a-zA-Z0-9_!@#$%^&*()\-+=.]{8,32}$/', $PST["PASSWORD"], "PASSWORD");
check('/^[a-zA-Z0-9_-]{4,32}$/', $PST["USERNAME"], "USERNAME");

// CHECK ARGUMENT RELATIONSHIPS
if (!(array_key_exists("EMAIL", $PST) and array_key_exists("PASSWORD", $PST) and array_key_exists("USERNAME", $PST))) {
    throw new incorrectArgumentsError();
}

// TYPES OF QUERIES
if (true) {
    echo json_encode(database_request("INSERT INTO users (username, joined, email, hashpass, preferences, role) VALUES ('" . $PST["USERNAME"] . "', '" . date('Y-m-d H:i:s') . "', '" . $PST["EMAIL"] . "', '" . encrypt($PST["USERNAME"], $PST["PASSWORD"]) . "', '" . json_encode([]) . "', " . 0 . ")", $database));
}
?>