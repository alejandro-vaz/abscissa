<?php 
/*                                                                           */
/* GLOBALS                                                                   */
/*                                                                           */

// GLOBALS -> DECLARATIONS
global $DB;
global $ENV;
global $MOD;
global $PST;


/*                                                                           */
/* ERROR AND ALERT DEFINITIONS                                               */
/*                                                                           */

// ERROR AND ALERT DEFINITIONS -> ERRORS
class PHPError extends Exception {public $terminate = true;}
class regexError extends PHPError {}
class databaseConnectionError extends PHPError {}
class databaseQueryError extends PHPError {}
class environmentNotFoundError extends PHPError {}
class moduleNotFoundError extends PHPError {}
class incorrectArgumentsError extends PHPError {}
class unknownArgumentValueError extends PHPError {}
class curlError extends PHPError {}

// ERROR AND ALERT DEFINITIONS -> ALERTS
class PHPAlert extends Exception {public $terminate = false;}
class incorrectModuleLabelAlert extends PHPAlert {}


/*                                                                           */
/* CURL HANDLING                                                             */
/*                                                                           */

// CURL HANDLING -> FUNCTION
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

// EXCEPTION HANDLING -> FUNCTION
function exceptionHandler(Throwable $exception) {
    $log = [
        "ERROR" => get_class($exception), 
        "FILE" => $exception->getFile(), 
        "LINE" => $exception->getLine(),
        "MESSAGE" => $exception->getMessage()
    ];
    curl("../database/logs.php", $log);
    echo json_encode($log);
    if (property_exists($exception, "terminate")) {
        if ($exception->terminate) {
            exit;
        }
    } else {
        exit;
    }
}

// EXCEPTION HANDLING -> SET DEFAULT HANDLER
set_exception_handler("exceptionHandler");


/*                                                                           */
/* MODULE HANDLING                                                           */
/*                                                                           */

// MODULE HANDLING -> DEFINITION
$MOD = [];

// MODULE HANDLING -> IMPROT MODULE
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

// MODULE HANDLING -> ACTIVATE MODULES
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


/*                                                                           */
/* ENVIRONMENT                                                               */
/*                                                                           */

// ENVIRONMENT --> INITIALIZE
$ENV = [];
$path = __DIR__ . '/../.env';

// ENVIRONMENT -> CHECK
if (!file_exists($path)) {
    throw new environmentNotFoundError("Environment file not found at: $path");
}

// ENVIRONMENT -> CONTENT
$content = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
foreach ($content as $line) {
    if (strpos(trim($line), '#') === 0) {
        continue;
    }
    list($key, $value) = explode('=', $line, 2);
    $key = strtoupper(trim($key));
    $value = trim($value);
    $ENV[$key] = $value;
}
?>