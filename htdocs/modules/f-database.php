<?php 
// FUNCTION TO CONNECT TO DATABASE
function database_connect(string $host, string $user, string $password, string $name): object {
    // CONNECT TO DATABASE
    $db = new mysqli($host, $user, $password, $name);
    // CHECK CONNECTION
    if ($db->connect_error) {
        throw new databaseConnectionError();
    }
    // RETURN DATABASE
    return $db;
}

// FUNCTION TO MAKE A QUERY
function database_request(string $query, object $db): mixed {
    $request = $db->prepare($query);
    if (!$request) {
        // HANDLE PREPARATION ERROR
        return false;
    }
    if (!$request->execute()) {
        // HANDLE EXECUTION ERROR
        $request->close();
        return false;
    }
    $result = null;
    $meta = $request->result_metadata();
    if ($meta) {
        $result = $request->get_result();
        $request->close();
        return $result;
    } else {
        return true;
    }
}

// GENERATE SESSION ID
function gensession(): string {
    return bin2hex(openssl_random_pseudo_bytes(16));
}

// FUNCTION TO SET A SESSION
function setsession($id) {
    setcookie(
        'session',
        $id,
        [
            'expires' => time() + 72000,
            'path' => '/',
            'secure' => true,
            'samesite' => 'lax'
        ]
    );
}

// FUNCTION TO DELETE THE SESSION
function delsession(): void {
    setcookie(
        'session', 
        '', 
        [
            "expires" => time() - 72000,
            'path' => '/',
            'secure' => true,
            'samesite' => 'lax'
        ]
    );
}

// FUNCTION TO VALIDATE THE SESSION
function database_validate(object $db): bool {
    // COOKIE VARIABLE
    $id = $_COOKIE['session'];
    // CHECK IF THERE'S NO COOKIE STORED IN BROWSER
    if (empty($id)) {
        return false;
    }
    // RETRIEVE COOKIE FROM DATABASE
    $data = database_request("SELECT session, username, expires, ip FROM sessions WHERE session = '$id'", $db)->fetch_assoc();
    // CHECK IF THERE'S NO COOKIE NAMED LIKE THAT IN THE DATABASE
    if (!$data) {
        delsession();
        return false;
    }
    // CHECK IF IT'S VALID
    if (new DateTime() > new DateTime($data['expires'])) {
        delsession();
        return false;
    }
    // IT IS POSSIBLE TO ADD IP VALIDATION
    return true;
}
?>