<?php 
// GET ALL ARGUMENTS
global $ARG;
foreach ($_GET as $key => $value) {
    $ARG[strtoupper($key)] = $value;
}
?>