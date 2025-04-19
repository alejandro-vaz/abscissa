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
check('/^[A-Z0-9]{6}$/', $PST['ID'], "ID");
check('/^[A-Z0-9]{4}$/', $PST["NODE"], "NODE");

// CHECK ARGUMENT RELATIONSHIPS
if (array_key_exists("ID", $PST) and array_key_exists("NODE", $PST)) {
    throw new incorrectArgumentsError();
}
if (array_key_exists("CONTEXT", $PST) and (array_key_exists("ID", $PST) or array_key_exists("NODE", $PST))) {
    throw new incorrectArgumentsError();
}
if (!(array_key_exists("CONTEXT", $PST)) and !(array_key_exists("ID", $PST)) and !(array_key_exists("NODE", $PST))) {
    throw new incorrectArgumentsError();
}

// TYPES OF QUERIES
if (array_key_exists("ID", $PST)) {
    $result = database_request("SELECT * FROM problems WHERE id ='" . $PST["ID"] . "' AND data_" . $PST["LANG"] . " IS NOT NULL", $database);
    echo json_encode($result->fetch_assoc());
} elseif (array_key_exists("NODE", $PST)) {
    $result = database_request("SELECT * FROM problems WHERE node LIKE '%" . $PST["NODE"] . "%' AND data_" . $PST["LANG"] . " IS NOT NULL" , $database);
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
} else {
    $result = match (strtolower($PST["CONTEXT"])) {
        "day" => database_request("SELECT * FROM problems WHERE data_" . $PST["LANG"] . " IS NOT NULL LIMIT " . crc32(date('Y-m-d')) % intval((database_request("SELECT COUNT(*) AS total FROM problems WHERE data_" . $PST["LANG"] . " IS NOT NULL", $database)->fetch_assoc())['total']) . ', 1', $database),
        "random" => database_request("SELECT * FROM problems WHERE data_" . $PST["LANG"] . " IS NOT NULL LIMIT " . rand(0, intval((database_request("SELECT COUNT(*) as total FROM problems WHERE data_" . $PST["LANG"] . " IS NOT NULL", $database)->fetch_assoc())['total']) - 1) . ", 1", $database),
        default => throw new unknownArgumentValueError("CONTEXT"),
    };
    echo json_encode($result->fetch_assoc());
}
?>