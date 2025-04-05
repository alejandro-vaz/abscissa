<?php
// INPUT VALIDATION ERROR
class regexException extends Exception {
    public function errorMessage() {
        return "(000) Error ({$this->getFile()}:{$this->getLine()}) -> {$this->getMessage()}";
    }
}

// DATABASE CONNECTION ERROR
class databaseConnectException extends Exception {
    public function errorMessage() {
        return "(001) Error ({$this->getFile()}:{$this->getLine()}) -> {$this->getMessage()}";
    }
}

// ENVIRONMENT NOT FOUND
class environmentNotFoundException extends Exception {
    public function errorMessage() {
        return "(002) Error ({$this->getFile()}:{$this->getLine()}) -> {$this->getMessage()}";
    }
}

// ENVIRONMENT VARIABLE NOT FOUND
class environmentVariableNotFoundException extends Exception {
    public function errorMessage() {
        return "(002) Error ({$this->getFile()}:{$this->getLine()}) -> {$this->getMessage()}";
    }
}
?>