<?php 
// HANDLER
require_once "../modules/.php";

// IMPORTS
module("functional", "check");
module("functional", "cryptography");
module("functional", "database");
module("functional", "post");

// SIGNAL
signal("functional");

// RESPONSE SET TO JSON FROM ANYONE
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// CHECK ARGUMENTS
check($PST, "EMAIL");
check($PST, "PASSWORD");
check($PST, "USERNAME");

// CHECK ARGUMENT RELATIONSHIPS
if (isx($PST, "CONTEXT")) {
    if ($PST["CONTEXT"] == "login") {
        if (!(isx($PST, "PASSWORD") and (isx($PST, "EMAIL") xor isx($PST, "USERNAME")))) {
            throw new incorrectArgumentsError();
        }
    } elseif ($PST["CONTEXT"] == "register") {
        if (!(isx($PST, "EMAIL") and isx($PST, "PASSWORD") and isx($PST, "USERNAME"))) {
            throw new incorrectArgumentsError();
        }
    } elseif ($PST["CONTEXT"] == "validate") {
        null;
    } else {
        throw new unknownArgumentValueError("CONTEXT");
    }
} else {
    throw new incorrectArgumentsError();
}

// TYPES OF QUERIES
if ($PST["CONTEXT"] == "login") {
    if (isx($PST, "EMAIL")) {
        $data = database_request(
            "SELECT hashpass, username FROM users WHERE email = ?",
            [
                $PST["EMAIL"]
            ]
        )->fetch_assoc();
        $hashpass = $data["hashpass"];
        $username = $data["username"];
        if (decrypt($hashpass, $PST["PASSWORD"]) == $username) {
            // GENERATE SESSION
            $session = gensession();
            // SET THE SESSION FOR THE USER
            setsession($session);
            // CREATE SESSION
            echo database_request(
                "INSERT INTO sessions (session, username, expires, ip) VALUES (?, ?, ?, ?)",
                [
                    $session,
                    $username,
                    (new DateTime('+20 hour'))->format('Y-m-d H:i:s'),
                    $_SERVER['REMOTE_ADDR']
                ]
            );
        }
    } else {
        $data = database_request(
            "SELECT hashpass FROM users WHERE username = ?",
            [
                $PST["USERNAME"]
            ]
        )->fetch_assoc();
        $hashpass = $data["hashpass"];
        if (decrypt($hashpass, $PST["PASSWORD"]) == $PST["USERNAME"]) {
            // GENERATE SESSION
            $session = gensession();
            // SET THE SESSION FOR THE USER
            setsession($session);
            // CREATE SESSION
            echo database_request(
                "INSERT INTO sessions (session, username, expires, ip) VALUES (?, ?, ?, ?)",
                [
                    $session,
                    $PST["USERNAME"],
                    (new DateTime('+20 hour'))->format('Y-m-d H:i:s'),
                    $_SERVER['REMOTE_ADDR']
                ]
            );
        }
    }
} elseif ($PST["CONTEXT"] == "register") {
    echo json_encode(database_request(
        "INSERT INTO users (username, joined, email, hashpass, preferences, role) VALUES (?, ?, ?, ?, ?)",
        [
            $PST["USERNAME"],
            date('Y-m-d H:i:s'),
            $PST["EMAIL"],
            encrypt($PST["USERNAME"], $PST["PASSWORD"]),
            json_encode([])
        ]
    ));
} else {
    echo json_encode(database_validate());
}
?>