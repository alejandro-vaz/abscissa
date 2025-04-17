<?php 
// EXCEPTIONS
class PHPError extends Exception {public $terminate = true;}
// REGEX CHECK EXCEPTION
class regexError extends PHPError {}
// DATABASE CONNECTION EXCEPTION
class databaseConnectionError extends PHPError {}
// ENVIRONMENT NOT FOUND EXCEPTION
class environmentNotFoundError extends PHPError {}
// MODULE NOT FOUND EXCEPTION
class moduleNotFoundError extends PHPError {}
// TOO MANY ARGUMENTS EXCEPTION
class tooManyArgumentsError extends PHPError {}
// NOT ENOUGH ARGUMENTS EXCEPTION
class notEnoughArgumentsError extends PHPError {}
// UNKNOWN ARGUMENT EXCEPTION
class unknownArgumentValueError extends PHPError {}

// ALERTS
class PHPAlert extends Exception {public $terminate = false;}

// INCORRECT MODULE LABELING
class incorrectModuleLabelAlert extends PHPAlert {}

// EXCEPTION HANDLER
function exceptionHandler(Throwable $exception) {
    if (property_exists($exception, "terminate")) {
        if ($exception->terminate) {
            header('Content-Type: application/json');
            echo json_encode([
                "Error" => get_class($exception), 
                "File" => $exception->getFile(), 
                "Line" => $exception->getLine(),
                "Message" => $exception->getMessage()
            ]);
        } else {
            // TO-DO LOG ALERT TO DATABASE AND CONTINUE EXECUTION
        }
    } else {
        header('Content-Type: application/json');
        echo json_encode([
            "Error" => get_class($exception), 
            "File" => $exception->getFile(), 
            "Line" => $exception->getLine(),
            "Message" => $exception->getMessage()
        ]);
    }
}
set_exception_handler("exceptionHandler");

// MODULE SET UP
global $MOD;
$MOD = [];

// FUNCTION TO ADD MODULES
function module($type, $module) {
    global $MOD;
    $char = match ($type) {
        "interface" => "i",
        "functional" => "f",
        "head" => "h",
        "working" => "w"
    };
    $MOD[] = $module;
    if (!file_exists(__DIR__ . "/../modules/$char" . "-$module.php")) {
        throw new incorrectModuleLabelAlert($char . "-$module.php");
    }
}

// FUNCTION TO ACTIVATE MODULES
function signal($signal) {
    global $MOD;
    $char = match ($signal) {
        "interface" => "i",
        "functional" => "f",
        "head" => "h",
        "working" => "w"
    };
    $localDir = __DIR__ . "/../modules/";
    $prefixes = ['i', "f", "h", "w"];
    foreach ($MOD as $module) {
        $paths = [];
        $correctPath = "{$localDir}{$char}-$module.php";
        foreach ($prefixes as $prefix) {
            $paths[] = "{$localDir}{$prefix}-$module.php";
        }
        if (empty(array_filter($paths, 'file_exists'))) {
            throw new moduleNotFoundError($correctPath);
        } 
        if (file_exists($correctPath)) {
            require_once $correctPath;
        }
    }
}
?>