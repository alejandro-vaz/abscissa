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
check($PST, "ERROR");
check($PST, "FILE");
check($PST, "LINE");
check($PST, "MESSAGE");

// CHECK ARGUMENT RELATIONSHIPS
if (!(isx($PST, "ERROR") and isx($PST, "FILE") and isx($PST, "LINE") and isx($PST, "MESSAGE"))) {
    throw new incorrectArgumentsError();
}

// TYPES OF QUERIES
if (true) {
    echo json_encode(database_request(
        "INSERT INTO logs (error, file, line, message, time) VALUES (?, ?, ?, ?, ?)",
        [
            $PST["ERROR"],
            $PST["FILE"],
            intval($PST["LINE"]),
            $PST["MESSAGE"],
            date('Y-m-d H:i:s')
        ]
    ));
}
?>