<?php
// HANDLER
require_once "../modules/.php";
require_once "../modules/.php";

// IMPORTS
module("functional", "arguments");
module("functional", "environment");
module("functional", "database");
module("functional", "check");

// SIGNAL
signal("functional");

// RESPONSE SET TO JSON FROM ANYONE
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// CONNECT TO THE DATABASE
$database = database_connect($ENV["DB_HOST"], $ENV["DB_USER"], $ENV["DB_PASSWORD"], $ENV["DB_NAME"]);

// CHECK ARGUMENTS
check('/^[a-z]{2}$/', $ARG["LANG"], "LANG");
check('/^[A-Z0-9]{6}$/', $ARG['ID'], "ID");
check('/^[A-Z0-9]{4}$/', $ARG["NODE"], "NODE");

// CHECK ARGUMENT RELATIONSHIPS
if (array_key_exists("ID", $ARG) and array_key_exists("NODE", $ARG)) {
    throw new tooManyArgumentsError();
}
if (array_key_exists("CONTEXT", $ARG) and (array_key_exists("ID", $ARG) or array_key_exists("NODE", $ARG))) {
    throw new tooManyArgumentsError();
}
if (!(array_key_exists("CONTEXT", $ARG)) and !(array_key_exists("ID", $ARG)) and !(array_key_exists("NODE", $ARG))) {
    throw new notEnoughArgumentsError();
}

// TYPES OF QUERIES
if (array_key_exists("ID", $ARG)) {
    $result = database_request("SELECT * FROM problems WHERE id ='" . $ARG["ID"] . "' AND data_" . $ARG["LANG"] . " IS NOT NULL", $database);
    echo json_encode($result->fetch_assoc());
} elseif (array_key_exists("NODE", $ARG)) {
    $result = database_request("SELECT * FROM problems WHERE node LIKE '%" . $ARG["NODE"] . "%' AND data_" . $ARG["LANG"] . " IS NOT NULL" , $database);
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
} else {
    $result = match (strtolower($ARG["CONTEXT"])) {
        "day" => database_request("SELECT * FROM problems WHERE data_" . $ARG["LANG"] . " IS NOT NULL LIMIT " . crc32(date('Y-m-d')) % intval((database_request("SELECT COUNT(*) AS total FROM problems WHERE data_" . $ARG["LANG"] . " IS NOT NULL", $database)->fetch_assoc())['total']) . ', 1', $database),
        "random" => database_request("SELECT * FROM problems WHERE data_" . $ARG["LANG"] . " IS NOT NULL LIMIT " . rand(0, intval((database_request("SELECT COUNT(*) as total FROM problems WHERE data_" . $ARG["LANG"] . " IS NOT NULL", $database)->fetch_assoc())['total']) - 1) . ", 1", $database),
        default => throw new unknownArgumentValueError(),
    };
    echo json_encode($result->fetch_assoc());
}
?>