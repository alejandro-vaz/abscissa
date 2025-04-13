<?php
// HANDLER
require_once "../modules/.php";

// IMPORTS
add("f", "arguments");
add("f", "environment");
add("f", "database");
add("f", "test");

// RESPONSE SET TO JSON FROM ANYONE
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// CONNECT TO THE DATABASE
$database = database_connect($ENV["DB_HOST"], $ENV["DB_USER"], $ENV["DB_PASSWORD"], $ENV["DB_NAME"]);

// CHECK ARGUMENTS
test('/^[a-z]{2}$/', $ARG["LANG"], "LANG");
if ($ARG["ID"]) {
    test('/^[A-Z0-9]{6}$/', $ARG['ID'], "ID");
}
if ($ARG["NODE"]) {
    test('/^[A-Z0-9]{4}$/', $ARG["NODE"], "NODE");
}

// CHECK ARGUMENT RELATIONSHIPS
if ($ARG["ID"] and $ARG["NODE"]) {
    throw new tooManyArgumentsException();
}
if ($ARG["CONTEXT"] and ($ARG["ID"] or $ARG["NODE"])) {
    throw new tooManyArgumentsException();
}
if (!($ARG["CONTEXT"]) and !($ARG["ID"]) and !($ARG["NODE"])) {
    throw new notEnoughArgumentsException();
}

// TYPES OF QUERIES
if ($ARG["ID"]) {
    $result = database_request("SELECT * FROM problems WHERE id ='" . $ARG["ID"] . "' AND data_" . $ARG["LANG"] . " IS NOT NULL", $database);
    echo json_encode(($result->fetch_all(MYSQLI_ASSOC))[0]);
} elseif ($ARG["NODE"]) {
    $result = database_request("SELECT * FROM problems WHERE node LIKE '%" . $ARG["NODE"] . "%' AND data_" . $ARG["LANG"] . " IS NOT NULL" , $database);
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
} else {
    $result = match (strtolower($ARG["CONTEXT"])) {
        "day" => database_request("SELECT * FROM problems WHERE data_" . $ARG["LANG"] . " IS NOT NULL LIMIT " . crc32(date('Y-m-d')) % intval((database_request("SELECT COUNT(*) AS total FROM problems WHERE data_" . $ARG["LANG"] . " IS NOT NULL", $database)->fetch_assoc())['total']) . ', 1', $database),
        "random" => database_request("SELECT * FROM problems WHERE data_" . $ARG["LANG"] . " IS NOT NULL LIMIT " . rand(0, intval((database_request("SELECT COUNT(*) as total FROM problems WHERE data_" . $ARG["LANG"] . " IS NOT NULL", $database)->fetch_assoc())['total']) - 1) . ", 1", $database),
        default => throw new unknownArgumentValueException(),
    };
    echo json_encode(($result->fetch_all(MYSQLI_ASSOC))[0]);
}
?>