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
function database_request(string $query, object $db) {
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
?>