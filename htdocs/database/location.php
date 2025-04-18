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
check('/^[A-Z0-9]{6}$/', $ARG['ID'], "ID");
check('/^[A-Z0-9]{4}$/', $ARG["NODE"], "NODE");
check('/^[A-Z0-9]{2}$/', $ARG["CLUSTER"], "CLUSTER");

// CHECK ARGUMENT RELATIONSHIPS
if (count($ARG) > 2) {
    throw new tooManyArgumentsError();
} 
if (count($ARG) < 2) {
    throw new notEnoughArgumentsError();
}

// TYPES OF QUERIES
if (array_key_exists("ID", $ARG)) {
    $problemsQuery = database_request("SELECT node, name_" . $ARG["LANG"] . " FROM problems WHERE id = '" . $ARG["ID"] . "'", $database)->fetch_assoc();
    $nodesQuery = database_request("SELECT cluster, name_" . $ARG["LANG"] . " FROM nodes WHERE node = '" . $problemsQuery["node"] . "'", $database)->fetch_assoc();
    $clustersQuery = database_request("SELECT tree, name_" . $ARG["LANG"] . " FROM clusters WHERE cluster = '" . $nodesQuery["cluster"] . "'", $database)->fetch_assoc();
    $treesQuery = database_request("SELECT name_" . $ARG["LANG"] . " FROM trees WHERE tree = '" . $clustersQuery["tree"] . "'", $database)->fetch_assoc();
    echo json_encode([
        "id" => [
            "value" => $ARG["ID"],
            "name" => $problemsQuery["name_" . $ARG["LANG"]]
        ],
        "node" => [
            "value" => $problemsQuery["node"],
            "name" => $nodesQuery["name_" . $ARG["LANG"]]
        ],
        "cluster" => [
            "value" => $nodesQuery["cluster"],
            "name" => $clustersQuery["name_" . $ARG["LANG"]]
        ],
        "tree" => [
            "value" => $clustersQuery["tree"],
            "name" => $treesQuery["name_" . $ARG["LANG"]]
        ]
    ]);
} elseif (array_key_exists("NODE", $ARG)) {
    $nodesQuery = database_request("SELECT cluster, name_" . $ARG["LANG"] . " FROM nodes WHERE node = '" . $ARG["NODE"] . "'", $database)->fetch_assoc();
    $clustersQuery = database_request("SELECT tree, name_" . $ARG["LANG"] . " FROM clusters WHERE cluster = '" . $nodesQuery["cluster"] . "'", $database)->fetch_assoc();
    $treesQuery = database_request("SELECT name_" . $ARG["LANG"] . " FROM trees WHERE tree = '" . $clustersQuery["tree"] . "'", $database)->fetch_assoc();
    echo json_encode([
        "id" => [
            "value" => null,
            "name" => null
        ],
        "node" => [
            "value" => $ARG["NODE"],
            "name" => $nodesQuery["name_" . $ARG["LANG"]]
        ],
        "cluster" => [
            "value" => $nodesQuery["cluster"],
            "name" => $clustersQuery["name_" . $ARG["LANG"]]
        ],
        "tree" => [
            "value" => $clustersQuery["tree"],
            "name" => $treesQuery["name_" . $ARG["LANG"]]
        ]
    ]);
} else {
    $clustersQuery = database_request("SELECT tree, name_" . $ARG["LANG"] . " FROM clusters WHERE cluster = '" . $ARG["CLUSTER"] . "'", $database)->fetch_assoc();
    $treesQuery = database_request("SELECT name_" . $ARG["LANG"] . " FROM trees WHERE tree = '" . $clustersQuery["tree"] . "'", $database)->fetch_assoc();
    echo json_encode([
        "id" => [
            "value" => null,
            "name" => null
        ],
        "node" => [
            "value" => null,
            "name" => null
        ],
        "cluster" => [
            "value" => $ARG["CLUSTER"],
            "name" => $clustersQuery["name_" . $ARG["LANG"]]
        ],
        "tree" => [
            "value" => $clustersQuery["tree"],
            "name" => $treesQuery["name_" . $ARG["LANG"]]
        ]
    ]);
}
?>