<?php 
// EXCEPTIONS
class PHPException extends Exception {public $terminate = true;}
// REGEX CHECK EXCEPTION
class regexException extends PHPException {}
// DATABASE CONNECTION EXCEPTION
class databaseConnectException extends PHPException {}
// ENVIRONMENT NOT FOUND EXCEPTION
class environmentNotFoundException extends PHPException {}
// MODULE NOT FOUND EXCEPTION
class moduleNotFoundException extends PHPException {}
// TOO MANY ARGUMENTS EXCEPTION
class tooManyArgumentsException extends PHPException {}
// NOT ENOUGH ARGUMENTS EXCEPTION
class notEnoughArgumentsException extends PHPException {}
// UNKNOWN ARGUMENT EXCEPTION
class unknownArgumentValueException extends PHPException {}

// ALERTS
class PHPAlert extends Exception {public $terminate = false;}

// TO-DO CREATE ALERTS

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
        // TO-DO LOG ALERT TO DATABASE
    }
}
set_exception_handler("exceptionHandler");

// ADD MODULE FUNCTION
/* TYPES OF MODULES:
f - PHP FRAMEWORKS
h - HEAD MODULES
w - WORKING MODULES
i - UI
*/
function add($type, $module) {
    $path = __DIR__ . "/../modules/$type" . "-" . "$module.php";
    if (!file_exists($path)) {
        throw new moduleNotFoundException($module);
    } else {
        require_once $path;
    }
}
?>