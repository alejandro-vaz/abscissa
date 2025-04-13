<?php 
// REGEX CHECK ERROR
class regexException extends Exception {public $terminate = true;}
// DATABASE CONNECTION ERROR
class databaseConnectException extends Exception {public $terminate = true;}
// ENVIRONMENT NOT FOUND ERROR
class environmentNotFoundException extends Exception {public $terminate = true;}
// MODULE NOT FOUND ERROR
class moduleNotFoundException extends Exception {public $terminate = true;}
// TOO MANY ARGUMENTS ERROR
class tooManyArgumentsException extends Exception {public $terminate = true;}
// NOT ENOUGH ARGUMENTS ERROR
class notEnoughArgumentsException extends Exception {public $terminate = true;}
// UNKNOWN ARGUMENT VALUE
class unknownArgumentValueException extends Exception {public $terminate = true;}

// ALERTS

// EXCEPTION HANDLER
function exceptionHandler(Throwable $exception) {
    if ($exception->terminate) {
        echo json_encode([
            "Error" => get_class($exception), 
            "File" => $exception->getFile(), 
            "Line" => $exception->getLine(),
            "Message" => $exception->getMessage()
        ]);
        exit;
    } else {
        // LOG ALERT TO DATABASE
    }
}
set_exception_handler("exceptionHandler");

// ADD MODULE FUNCTION
function add($type, $module) {
    $path = __DIR__ . "/../modules/$type" . "-" . "$module.php";
    if (!file_exists($path)) {
        throw new moduleNotFoundException($module);
    } else {
        require_once $path;
    }
}
?>