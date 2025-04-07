<?php 
// INPUT VALIDATION ERROR
class regexException extends Exception {
    public function errorMessage() {
        return "Error ({$this->getFile()}:{$this->getLine()}) -> {$this->getMessage()}";
    }
}
// DATABASE CONNECTION ERROR
class databaseConnectException extends Exception {
    public function errorMessage() {
        return "Error ({$this->getFile()}:{$this->getLine()}) -> {$this->getMessage()}";
    }
}
// ENVIRONMENT NOT FOUND
class environmentNotFoundException extends Exception {
    public function errorMessage() {
        return "Error ({$this->getFile()}:{$this->getLine()}) -> {$this->getMessage()}";
    }
}
// ENVIRONMENT VARIABLE NOT FOUND
class environmentVariableNotFoundException extends Exception {
    public function errorMessage() {
        return "Error ({$this->getFile()}:{$this->getLine()}) -> {$this->getMessage()}";
    }
}

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