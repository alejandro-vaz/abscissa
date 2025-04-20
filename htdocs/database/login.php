<?php 
// HANDLER
require_once "../modules/.php";

// IMPORTS
module("functional", "check");
module("functional", "cryptography");
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
check('/^[A-Za-z0-9._%\-]+@gmail.com$/', $PST["EMAIL"], "EMAIL");
check('/^[a-zA-Z0-9_!@#$%^&*()\-+=.]{8,32}$/', $PST["PASSWORD"], "PASSWORD");
check('/^[a-zA-Z0-9_-]{4,32}$/', $PST["USERNAME"], "USERNAME");

// CHECK ARGUMENT RELATIONSHIPS
if (!(array_key_exists("PASSWORD", $PST) and (array_key_exists("EMAIL", $PST) xor array_key_exists("USERNAME", $PST)))) {
    throw new incorrectArgumentsError();
}

// TYPES OF QUERIES
if (array_key_exists("EMAIL", $PST)) {
    $data = database_request("SELECT hashpass, username FROM users WHERE email = '" . $PST["EMAIL"] . "'", $database)->fetch_assoc();
    $hashpass = $data["hashpass"];
    $username = $data["username"];
    $crypt = decrypt($hashpass, $PST["PASSWORD"]);
    if ($crypt == $username) {
        // GENERATE SESSION
        $session = gensession();
        // CREATE SESSION
        $result = database_request("INSERT INTO sessions (session, username, expires, ip) VALUES ('" . $session . "', '" . $username . "', '" . (new DateTime('+20 hour'))->format('Y-m-d H:i:s') . "', '" . $_SERVER['REMOTE_ADDR'] . "')", $database);
        // SET THE SESSION FOR THE USER
        setsession($session);
        // RETURN TRUE SO USER KNOWS LOG IN HAS BEEN SUCCESSFUL
        echo $result;
    }
} else {
    $hashpass = database_request("SELECT hashpass FROM users WHERE username = '" . $PST["USERNAME"] . "'", $database)->fetch_assoc()["hashpass"];
    $crypt = decrypt($hashpass, $PST["PASSWORD"]);
    if ($crypt == $PST["USERNAME"]) {
        // GENERATE SESSION
        $session = gensession();
        // CREATE SESSION
        $result = database_request("INSERT INTO sessions (session, username, expires, ip) VALUES ('" . $session . "', '" . $PST["USERNAME"] . "', '" . (new DateTime('+20 hour'))->format('Y-m-d H:i:s') . "', '" . $_SERVER['REMOTE_ADDR'] . "')", $database);
        // SET THE SESSION FOR THE USER
        setsession($session);
        // RETURN TRUE SO USER KNOWS LOG IN HAS BEEN SUCCESSFUL
        echo $result;
    }
}