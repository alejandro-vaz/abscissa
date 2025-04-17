<?php
// HANDLER
require_once "../modules/.php";

// IMPORTS
module("functional", "arguments");
module("functional", "check");
module("functional", "database");
module("functional", "environment");

// SIGNAL
signal("functional");

// RESPONSE SET TO JSON FROM ANYONE
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// CONNECT TO THE DATABASE
$database = database_connect($ENV["DB_HOST"], $ENV["DB_USER"], $ENV["DB_PASSWORD"], $ENV["DB_NAME"]);

// CHECK ARGUMENTS
check('/^[a-z]{2}$/', $ARG["LANG"], "LANG");
check('/^(?:[1-9][0-9]{0,7})$/', $ARG['RESOURCE'], "RESOURCE");
check('/^[A-Z0-9]{4}$/', $ARG["NODE"], "NODE");

// CHECK ARGUMENT RELATIONSHIPS
if (array_key_exists("RESOURCE", $ARG) and (array_key_exists("NODE", $ARG) or array_key_exists("TYPE", $ARG))) {
    throw new tooManyArgumentsError();
}
if (!(array_key_exists("RESOURCE", $ARG)) and !(array_key_exists("NODE", $ARG)) and !(array_key_exists("TYPE", $ARG))) {
    throw new notEnoughArgumentsError();
}

// TYPES OF QUERIES
if (array_key_exists("RESOURCE", $ARG)) {
    $result = database_request("SELECT * FROM resources WHERE resource = '" . $ARG["RESOURCE"] . "' AND lang LIKE '%" . $ARG["LANG"] . "%'", $database);
    echo json_encode($result->fetch_assoc());
} else {
    if ((array_key_exists("NODE", $ARG)) and (array_key_exists("TYPE", $ARG))) {
        $result = database_request("SELECT * FROM resources WHERE node = '" . $ARG["NODE"] . "' AND lang LIKE '%" . $ARG["LANG"] . "%' AND type = '" . $ARG["TYPE"] . "'", $database);
    }
    if ((array_key_exists("NODE", $ARG)) and !(array_key_exists("TYPE", $ARG))) {
        $result = database_request("SELECT * FROM resources WHERE node = '" . $ARG["NODE"] . "' AND lang LIKE '%" . $ARG["LANG"] . "%'", $database);
    }
    if (!(array_key_exists("NODE", $ARG)) and (array_key_exists("TYPE", $ARG))) {
        $result = database_request("SELECT * FROM resources WHERE type = '" . $ARG["TYPE"] . "' AND lang LIKE '%" . $ARG["LANG"] . "%'", $database);
    }
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}
?>