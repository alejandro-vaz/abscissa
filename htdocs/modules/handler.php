<?php 
// REGEX CHECK ERROR
class regexException extends Exception {}
// DATABASE CONNECTION ERROR
class databaseConnectException extends Exception {}
// ENVIRONMENT NOT FOUND ERROR
class environmentNotFoundException extends Exception {}
// MODULE NOT FOUND ERROR
class moduleNotFoundException extends Exception {}
// TOO MANY ARGUMENTS ERROR
class tooManyArgumentsException extends Exception {}
// NOT ENOUGH ARGUMENTS ERROR
class notEnoughArgumentsException extends Exception {}
// UNKNOWN ARGUMENT VALUE
class unknownArgumentValueException extends Exception {}

// EXCEPTION HANDLER
function exceptionHandler(Throwable $exception) {
    echo json_encode([
        "Error" => get_class($exception), 
        "File" => $exception->getFile(), 
        "Line" => $exception->getLine(),
        "Message" => $exception->getMessage()
    ]);
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