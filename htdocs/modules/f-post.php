<?php
// GET POST DATA
global $PST;
foreach (json_decode(file_get_contents("php://input")) as $key => $value) {
    $PST[strtoupper($key)] = $value;
}
?>