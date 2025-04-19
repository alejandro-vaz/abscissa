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

// CHECK ARGUMENTS
check('/^[a-z]{2}$/', $PST["LANG"], "LANG");
check('/^(?:[1-9][0-9]{0,7})$/', $PST['RESOURCE'], "RESOURCE");
check('/^[A-Z0-9]{4}$/', $PST["NODE"], "NODE");

// CHECK ARGUMENT RELATIONSHIPS
if (array_key_exists("RESOURCE", $PST) and (array_key_exists("NODE", $PST) or array_key_exists("TYPE", $PST))) {
    throw new incorrectArgumentsError();
}
if (!(array_key_exists("RESOURCE", $PST)) and !(array_key_exists("NODE", $PST)) and !(array_key_exists("TYPE", $PST))) {
    throw new incorrectArgumentsError();
}

// TYPES OF QUERIES
if (array_key_exists("RESOURCE", $PST)) {
    $result = database_request("SELECT * FROM resources WHERE resource = '" . $PST["RESOURCE"] . "' AND lang LIKE '%" . $PST["LANG"] . "%'", $database);
    echo json_encode($result->fetch_assoc());
} else {
    if ((array_key_exists("NODE", $PST)) and (array_key_exists("TYPE", $PST))) {
        $result = database_request("SELECT * FROM resources WHERE node = '" . $PST["NODE"] . "' AND lang LIKE '%" . $PST["LANG"] . "%' AND type = '" . $PST["TYPE"] . "'", $database);
    }
    if ((array_key_exists("NODE", $PST)) and !(array_key_exists("TYPE", $PST))) {
        $result = database_request("SELECT * FROM resources WHERE node = '" . $PST["NODE"] . "' AND lang LIKE '%" . $PST["LANG"] . "%'", $database);
    }
    if (!(array_key_exists("NODE", $PST)) and (array_key_exists("TYPE", $PST))) {
        $result = database_request("SELECT * FROM resources WHERE type = '" . $PST["TYPE"] . "' AND lang LIKE '%" . $PST["LANG"] . "%'", $database);
    }
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}
?>