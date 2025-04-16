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
            exit;
        } else {
            // TO-DO LOG ALERT TO DATABASE
        }
    } else {
        echo json_encode([
            "Error" => get_class($exception), 
            "File" => $exception->getFile(), 
            "Line" => $exception->getLine(),
            "Message" => $exception->getMessage()
        ]);
        exit;
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
    foreach ($MOD as $module) {
        $path1 = __DIR__ . "/../modules/i-$module.php";
        $path2 = __DIR__ . "/../modules/f-$module.php";
        $path3 = __DIR__ . "/../modules/h-$module.php";
        $path4 = __DIR__ . "/../modules/w-$module.php";
        $correctPath = __DIR__ . "/../modules/$char" . "-$module.php";
        if (!file_exists($path1) and !file_exists($path2) and !file_exists($path3) and !file_exists($path4)) {
            throw new moduleNotFoundError($correctPath);
        } else {
            if (file_exists($correctPath)) {
                require_once $correctPath;
            }
        }
    }
}
?>