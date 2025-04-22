<?php 
// HANDLER
require_once "../modules/.php";

// IMPORTS
module("functional", "check");
module("functional", "database");
module("functional", "post");

// SIGNAL
signal("functional");

// RESPONSE SET TO JSON FROM ANYONE
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// CHECK ARGUMENTS
check($PST, "LANG");
check($PST, "ID");
check($PST, "NODE");
check($PST, "CLUSTER");

// CHECK ARGUMENT RELATIONSHIPS
if (!(isx($PST, "LANG") and (isx($PST, "ID") xor isx($PST, "NODE") xor isx($PST, "CLUSTER")))) {
    throw new incorrectArgumentsError();
}

// TYPES OF QUERIES
if (isx($PST, "ID")) {
    $problemsQuery = database_request(
        "SELECT node, ? FROM problems WHERE id = ?",
        [
            "name_" . $PST["LANG"],
            $PST["ID"]
        ]
    )->fetch_assoc();
    $nodesQuery = database_request(
        "SELECT cluster, ? FROM nodes WHERE node = ?",
        [
            "name_" . $PST["LANG"],
            $problemsQuery["node"]
        ]
    )->fetch_assoc();
    $clustersQuery = database_request(
        "SELECT tree, ? FROM clusters WHERE cluster = ?",
        [
            "name_" . $PST["LANG"],
            $nodesQuery["cluster"]
        ]
    )->fetch_assoc();
    $treesQuery = database_request(
        "SELECT ? FROM trees WHERE tree = ?",
        [
            "name_" . $PST["LANG"],
            $clustersQuery["tree"]
        ]
    )->fetch_assoc();
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
} elseif (isx($PST, "NODE")) {
    $nodesQuery = database_request(
        "SELECT cluster, ? FROM nodes WHERE node = ?",
        [
            "name_" . $PST["LANG"],
            $PST["NODE"]
        ]
    )->fetch_assoc();
    $clustersQuery = database_request(
        "SELECT tree, name_" . $PST["LANG"] . " FROM clusters WHERE cluster = '" . $nodesQuery["cluster"] . "'",
        "SELECT tree, ? FROM clusters WHERE cluster = ?",
        [
            "name_" . $PST["LANG"],
            $nodesQuery["cluster"]
        ]
    )->fetch_assoc();
    $treesQuery = database_request(
        "SELECT ? FROM trees WHERE tree = ?",
        [
            "name_" . $PST["LANG"],
            $clustersQuery["tree"]
        ]
    )->fetch_assoc();
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
    $clustersQuery = database_request(
        "SELECT tree, ? FROM clusters WHERE cluster = ?",
        [
            "name_" . $PST["LANG"],
            $PST["CLUSTER"]
        ]
    )->fetch_assoc();
    $treesQuery = database_request(
        "SELECT ? FROM trees WHERE tree = ?",
        [
            "name_" . $PST["LANG"],
            $clustersQuery["tree"]
        ]
    )->fetch_assoc();
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