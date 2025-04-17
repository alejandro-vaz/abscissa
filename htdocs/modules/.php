<?php 
/*                                                                           */
/* ERROR AND ALERT DEFINITIONS                                               */
/*                                                                           */

// ERRORS
class PHPError extends Exception {public $terminate = true;}
// REGEX CHECK ERROR
class regexError extends PHPError {}
// DATABASE CONNECTION ERROR
class databaseConnectionError extends PHPError {}
// ENVIRONMENT NOT FOUND ERROR
class environmentNotFoundError extends PHPError {}
// MODULE NOT FOUND ERROR
class moduleNotFoundError extends PHPError {}
// TOO MANY ARGUMENTS ERROR
class tooManyArgumentsError extends PHPError {}
// NOT ENOUGH ARGUMENTS ERROR
class notEnoughArgumentsError extends PHPError {}
// UNKNOWN ARGUMENT ERROR
class unknownArgumentValueError extends PHPError {}
// CURL ERROR
class curlError extends PHPError {}

// ALERTS
class PHPAlert extends Exception {public $terminate = false;}
// INCORRECT MODULE LABELING ALERT
class incorrectModuleLabelAlert extends PHPAlert {}


/*                                                                           */
/* CURL HANDLING                                                             */
/*                                                                           */

// CALL ANOTHER PHP SCRIPT VIA CURL
function curl(string $relativePath, array $data): string {
    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'];
    $scriptDir = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/\\');
    $url = $scheme . '://' . $host . $scriptDir . '/' . ltrim($relativePath, '/');
    $request = curl_init($url);
    curl_setopt($request, CURLOPT_POST, true);
    curl_setopt($request, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($request, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($request, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($request, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($request, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    $response = curl_exec($request);
    if ($response === false) {
        $error = curl_error($request);
        curl_close($request);
        throw new curlError($error);
    }
    curl_close($request);
    return $response;
}


/*                                                                           */
/* EXCEPTION HANDLING                                                        */
/*                                                                           */

// EXCEPTION HANDLER
function exceptionHandler(Throwable $exception) {
    $log = [
        "ERROR" => get_class($exception), 
        "FILE" => $exception->getFile(), 
        "LINE" => $exception->getLine(),
        "MESSAGE" => $exception->getMessage()
    ];
    curl("../database/logs.php", $log);
    if (property_exists($exception, "terminate")) {
        if ($exception->terminate) {
            exit;
        }
    } else {
        exit;
    }
}

// SET AS DEFAULT EXCEPTION HANDLER
set_exception_handler("exceptionHandler");


/*                                                                           */
/* MODULE HANDLING                                                           */
/*                                                                           */

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