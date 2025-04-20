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
check('/^[A-Z0-9]{2}$/', $PST["CLUSTER"], "CLUSTER");

// CHECK ARGUMENT RELATIONSHIPS
if (!(array_key_exists("LANG", $PST) and (array_key_exists("ID", $PST) xor array_key_exists("NODE", $PST) xor array_key_exists("CLUSTER", $PST)))) {
    throw new incorrectArgumentsError();
}

// TYPES OF QUERIES
if (array_key_exists("ID", $PST)) {
    $problemsQuery = database_request("SELECT node, name_" . $PST["LANG"] . " FROM problems WHERE id = '" . $PST["ID"] . "'", $database)->fetch_assoc();
    $nodesQuery = database_request("SELECT cluster, name_" . $PST["LANG"] . " FROM nodes WHERE node = '" . $problemsQuery["node"] . "'", $database)->fetch_assoc();
    $clustersQuery = database_request("SELECT tree, name_" . $PST["LANG"] . " FROM clusters WHERE cluster = '" . $nodesQuery["cluster"] . "'", $database)->fetch_assoc();
    $treesQuery = database_request("SELECT name_" . $PST["LANG"] . " FROM trees WHERE tree = '" . $clustersQuery["tree"] . "'", $database)->fetch_assoc();
    echo json_encode([
        "id" => [
            "value" => $PST["ID"],
            "name" => $problemsQuery["name_" . $PST["LANG"]]
        ],
        "node" => [
            "value" => $problemsQuery["node"],
            "name" => $nodesQuery["name_" . $PST["LANG"]]
        ],
        "cluster" => [
            "value" => $nodesQuery["cluster"],
            "name" => $clustersQuery["name_" . $PST["LANG"]]
        ],
        "tree" => [
            "value" => $clustersQuery["tree"],
            "name" => $treesQuery["name_" . $PST["LANG"]]
        ]
    ]);
} elseif (array_key_exists("NODE", $PST)) {
    $nodesQuery = database_request("SELECT cluster, name_" . $PST["LANG"] . " FROM nodes WHERE node = '" . $PST["NODE"] . "'", $database)->fetch_assoc();
    $clustersQuery = database_request("SELECT tree, name_" . $PST["LANG"] . " FROM clusters WHERE cluster = '" . $nodesQuery["cluster"] . "'", $database)->fetch_assoc();
    $treesQuery = database_request("SELECT name_" . $PST["LANG"] . " FROM trees WHERE tree = '" . $clustersQuery["tree"] . "'", $database)->fetch_assoc();
    echo json_encode([
        "id" => [
            "value" => null,
            "name" => null
        ],
        "node" => [
            "value" => $PST["NODE"],
            "name" => $nodesQuery["name_" . $PST["LANG"]]
        ],
        "cluster" => [
            "value" => $nodesQuery["cluster"],
            "name" => $clustersQuery["name_" . $PST["LANG"]]
        ],
        "tree" => [
            "value" => $clustersQuery["tree"],
            "name" => $treesQuery["name_" . $PST["LANG"]]
        ]
    ]);
} else {
    $clustersQuery = database_request("SELECT tree, name_" . $PST["LANG"] . " FROM clusters WHERE cluster = '" . $PST["CLUSTER"] . "'", $database)->fetch_assoc();
    $treesQuery = database_request("SELECT name_" . $PST["LANG"] . " FROM trees WHERE tree = '" . $clustersQuery["tree"] . "'", $database)->fetch_assoc();
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
            "value" => $PST["CLUSTER"],
            "name" => $clustersQuery["name_" . $PST["LANG"]]
        ],
        "tree" => [
            "value" => $clustersQuery["tree"],
            "name" => $treesQuery["name_" . $PST["LANG"]]
        ]
    ]);
}
?>