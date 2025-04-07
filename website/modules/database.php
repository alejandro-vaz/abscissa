<?php 
// FUNCTION TO CONNECT TO DATABASE
function connect($host, $user, $password, $name) {
    // CONNECT TO DATABASE
    $db = new mysqli($host, $user, $password, $name);
    // CHECK CONNECTION
    if ($db->connect_error) {
        throw new databaseConnectException("");
    }
    // RETURN DATABASE
    return $db;
}

// FUNCTION TO REQUEST DATA
function request($query, $parameter, $wildcard, $db) {
    $request = $db->prepare($query);
    if ($wildcard) {
        $parameter = "%" . $parameter . "%";
    }
    if ($parameter) {
        $request->bind_param("s", $parameter);
    }
    $request->execute();
    $result = $request->get_result();
    $request->close();
    return $result;
}
?>