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

// FUNCTION TO REQUEST DATA
function database_request(string $query, object $db) {
    // PREPARE QUERY
    $request = $db->prepare($query);
    // EXECUTE, GET AND RETURN RESULT
    $request->execute();
    $result = $request->get_result();
    $request->close();
    return $result;
}
?>