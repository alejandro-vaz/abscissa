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
check($PST, "RESOURCE");
check($PST, "NODE");

// CHECK ARGUMENT RELATIONSHIPS
if (isx($PST, "RESOURCE") and (isx($PST, "NODE") or isx($PST, "CONTEXT"))) {
    throw new incorrectArgumentsError();
}
if (!(isx($PST, "RESOURCE")) and !(isx($PST, "NODE")) and !(isx($PST, "CONTEXT"))) {
    throw new incorrectArgumentsError();
}

// TYPES OF QUERIES
if (isx($PST, "RESOURCE")) {
    $result = database_request(
        "SELECT * FROM resources WHERE resource = ? AND lang = ?",
        [
            $PST["RESOURCE"],
            $PST["LANG"]
        ]
    );
    echo json_encode($result->fetch_assoc());
} else {
    if ((isx($PST, "NODE")) and (isx($PST, "CONTEXT"))) {
        $result = database_request(
            "SELECT * FROM resources WHERE node = ? AND lang = ? AND type = ?",
            [
                $PST["NODE"],
                $PST["LANG"],
                $PST["CONTEXT"]
            ]
        );
    } elseif ((isx($PST, "NODE")) and !(isx($PST, "CONTEXT"))) {
        $result = database_request(
            "SELECT * FROM resources WHERE node = ? AND lang = ?",
            [
                $PST["NODE"],
                $PST["LANG"]
            ]
        );
    } elseif (!(isx($PST, "NODE")) and (isx($PST, "CONTEXT"))) {
        $result = database_request(
            "SELECT * FROM resources WHERE type = ? AND lang = ?",
            [
                $PST["CONTEXT"],
                $PST["LANG"]
            ]
        );
    } else {
        throw new incorrectArgumentsError();
    }
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}
?>