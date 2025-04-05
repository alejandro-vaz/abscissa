<?php
// REQUIRE A MODULE FUNCTION
function add($module) {
    try {
        $path = __DIR__ . "/../modules/$module.php";
        require_once $path;
    } catch (Exception $error) {
        echo "Failed to import $module.";
    }
}
?>