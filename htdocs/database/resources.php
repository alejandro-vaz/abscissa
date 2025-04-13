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
if ($ARG["RESOURCE"]) {
    test('/^(?:[1-9][0-9]{0,7})$/', $ARG['RESOURCE'], "RESOURCE");
}
if ($ARG["NODE"]) {
    test('/^[A-Z0-9]{4}$/', $ARG["NODE"], "NODE");
}

// CHECK ARGUMENT RELATIONSHIPS
if ($ARG["RESOURCE"] and ($ARG["NODE"] or $ARG["TYPE"])) {
    throw new tooManyArgumentsException();
}
if (!($ARG["RESOURCE"]) and !($ARG["NODE"]) and !($ARG["TYPE"])) {
    throw new notEnoughArgumentsException();
}

// TYPES OF QUERIES
if ($ARG["RESOURCE"]) {
    $result = database_request("SELECT * FROM resources WHERE resource = '" . $ARG["RESOURCE"] . "' AND lang LIKE '%" . $ARG["LANG"] . "%'", $database);
    echo json_encode(($result->fetch_all(MYSQLI_ASSOC))[0]);
} else {
    if (($ARG["NODE"]) and ($ARG["TYPE"])) {
        $result = database_request("SELECT * FROM resources WHERE node = '" . $ARG["NODE"] . "' AND lang LIKE '%" . $ARG["LANG"] . "%' AND type = '" . $ARG["TYPE"] . "'", $database);
    }
    if (($ARG["NODE"]) and !($ARG["TYPE"])) {
        $result = database_request("SELECT * FROM resources WHERE node = '" . $ARG["NODE"] . "' AND lang LIKE '%" . $ARG["LANG"] . "%'", $database);
    }
    if (!($ARG["NODE"]) and ($ARG["TYPE"])) {
        $result = database_request("SELECT * FROM resources WHERE type = '" . $ARG["TYPE"] . "' AND lang LIKE '%" . $ARG["LANG"] . "%'", $database);
    }
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}
?>