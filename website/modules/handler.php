<?php 
// REGEX CHECK ERROR
class regexException extends Exception {}
// DATABASE CONNECTION ERROR
class databaseConnectException extends Exception {}
// ENVIRONMENT NOT FOUND ERROR
class environmentNotFoundException extends Exception {}
// ENVIRONMENT VARIABLE NOT FOUND ERROR
class environmentVariableNotFoundException extends Exception {}
// MODULE NOT FOUND ERROR
class moduleNotFoundException extends Exception {}

// EXCEPTION HANDLER
function exceptionHandler(Throwable $exception) {
    echo "Error ({$exception->getFile()}:{$exception->getLine()}:{" . get_class($exception) . "}) -> {$exception->getMessage()}";
    exit;
}
set_exception_handler("exceptionHandler");

// ADD MODULE FUNCTION
function add($module) {
    $path = __DIR__ . "/../modules/$module.php";
    if (!file_exists($path)) {
        throw new moduleNotFoundException($module);
    } else {
        require_once $path;
    }
}
?>