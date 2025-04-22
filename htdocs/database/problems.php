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

// CHECK ARGUMENT RELATIONSHIPS
if (isx($PST, "ID") and isx($PST, "NODE")) {
    throw new incorrectArgumentsError();
}
if (isx($PST, "CONTEXT") and (isx($PST, "ID") or isx($PST, "NODE"))) {
    throw new incorrectArgumentsError();
}
if (!(isx($PST, "CONTEXT")) and !(isx($PST, "ID")) and !(isx($PST, "NODE"))) {
    throw new incorrectArgumentsError();
}

// TYPES OF QUERIES
if (isx($PST, "ID")) {
    echo json_encode(database_request(
        "SELECT * FROM problems WHERE id = ? AND ? IS NOT NULL",
        [
            $PST["ID"],
            "data_" . $PST["LANG"]
        ]
    )->fetch_assoc());
} elseif (isx($PST, "NODE")) {
    echo json_encode(database_request(
        "SELECT * FROM problems WHERE node = ? AND ? IS NOT NULL",
        [
            $PST["NODE"],
            "data_" . $PST["LANG"]
        ]
    )->fetch_all(MYSQLI_ASSOC));
} else {
    $result = match (strtolower($PST["CONTEXT"])) {
        "day" => database_request(
            "SELECT * FROM problems WHERE ? IS NOT NULL LIMIT ?, 1",
            [
                "data_" . $PST["LANG"],
                crc32(date('Y-m-d')) % intval(database_request(
                    "SELECT COUNT(*) AS total FROM problems WHERE ? IS NOT NULL",
                    [
                        "data_" . $PST["LANG"]
                    ]
                )->fetch_assoc()["total"])
            ]
        ),
        "random" => database_request(
            "SELECT * FROM problems WHERE ? IS NOT NULL LIMIT ?, 1",
            [
                "data_" . $PST["LANG"],
                rand(0, intval(database_request(
                    "SELECT COUNT(*) AS total FROM problems WHERE ? IS NOT NULL",
                    [
                        "data_" . $PST["LANG"]
                    ]
                )->fetch_assoc()['total']))
            ]
        ),
        default => throw new unknownArgumentValueError("CONTEXT"),
    };
    echo json_encode($result->fetch_assoc());
}
?>