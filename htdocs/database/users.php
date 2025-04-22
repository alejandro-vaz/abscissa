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

// VALIDATE SESSION
database_validate();

// TYPES OF QUERIES
if (true) {
    $result = database_request(
        "SELECT * FROM users WHERE username = ?",
        [
            database_request(
                "SELECT username FROM sessions WHERE session = ?",
                [
                    $_COOKIE['session']
                ]
            )->fetch_assoc()["username"]
        ]
    );
    echo json_encode($result->fetch_assoc());
}
?>