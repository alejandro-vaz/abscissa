<?php
// HANDLER
require_once "../modules/.php";

// IMPORTS
module("functional", "check");
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

// VALIDATE SESSION
database_validate($database);

// TYPES OF QUERIES
if (true) {
    $username = database_request("SELECT username FROM sessions WHERE session = '" . $_COOKIE['session'] . "'", $database)->fetch_assoc()["username"];
    $result = database_request("SELECT * FROM users WHERE username = '" . $username . "'", $database);
    echo json_encode($result->fetch_assoc());
}
?>