<?php
/*                                                                           */
/* POST                                                                      */
/*                                                                           */

// POST -> INITIALIZATION
global $PST;
$PST = [];

// POST -> FILL
if (is_iterable(json_decode(file_get_contents("php://input")))) {
    foreach (json_decode(file_get_contents("php://input")) as $key => $value) {
        $PST[strtoupper($key)] = $value;
    }
}
?>