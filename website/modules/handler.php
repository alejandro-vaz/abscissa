<?php 
// EXCEPTION HANDLER
function exceptionHandler(Throwable $exception) {
    echo $exception->getMessage();
}
set_exception_handler("exceptionHandler");

// ADD MODULE FUNCTION
function add($module) {
    try {
        $path = __DIR__ . "/../modules/$module.php";
        require_once $path;
    } catch (Exception $error) {
        echo "Failed to import $module.";
    }
}
?>