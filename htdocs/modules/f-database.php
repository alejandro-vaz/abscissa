<?php 
/*                                                                           */
/* GLOBAL IMPORTS                                                            */
/*                                                                           */

// GLOBAL IMPORTS -> VARIABLES
global $ENV;


/*                                                                           */
/* CONNECTION                                                                */
/*                                                                           */

// CONNECTION -> SET UP
global $DB;
$DB = new mysqli($ENV["DB_HOST"], $ENV["DB_USER"], $ENV["DB_PASSWORD"], $ENV["DB_NAME"]);
if ($DB->connect_error) {
    throw new databaseConnectionError();
};


/*                                                                           */
/* FUNCTIONS                                                                 */
/*                                                                           */

// FUNCTIONS -> QUERY
function database_request(string $query, array $values = []) {
    global $DB;
    $request = $DB->prepare($query);
    if ($request === false) {
        return false;
    }
    if (!empty($values)) {
        $types = '';
        foreach ($values as $val) {
            if      (is_int($val))    { $types .= 'i'; }
            elseif  (is_float($val))  { $types .= 'd'; }
            elseif  (is_string($val)) { $types .= 's'; }
            else                      { $types .= 'b'; }
        }
        $refs = [];
        foreach ($values as $key => $val) {
            $refs[$key] = &$values[$key];
        }
        array_unshift($refs, $types);
        call_user_func_array([$request, 'bind_param'], $refs);
    }
    if (!$request->execute()) {
        $request->close();
        return false;
    }
    if ($request->result_metadata()) {
        $result = $request->get_result();
        $request->close();
        return $result;
    }
    $request->close();
    return true;
}

// FUNCTIONS -> GENERATE SESSION
function gensession(): string {
    return bin2hex(openssl_random_pseudo_bytes(16));
}

// FUNCTIONS -> SET SESSION
function setsession($id): void {
    setcookie(
        'session',
        $id,
        [
            'expires' => time() + 72000,
            'path' => '/',
            'secure' => true,
            'samesite' => 'lax',
            "httponly" => true
        ]
    );
}

// FUNCTIONS -> DELETE SESSION
function delsession(): void {
    setcookie(
        'session', 
        '', 
        [
            "expires" => time() - 72000,
            'path' => '/',
            'secure' => true,
            'samesite' => 'lax',
            "httponly" => true
        ]
    );
}

// FUNCTIONS -> VALIDATE SESSION
function database_validate(): bool {
    // COOKIE VARIABLE
    $id = $_COOKIE['session'];
    // CHECK IF THERE'S NO COOKIE STORED IN BROWSER
    if (empty($id)) {
        return false;
    }
    // RETRIEVE COOKIE FROM DATABASE
    $data = database_request(
        "SELECT session, username, expires, ip FROM sessions WHERE session = ?",
        [
            $id
        ]
    )->fetch_assoc();
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