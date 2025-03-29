<?php
// LOAD ENVIRONMENT VARIABLES FUNCTION
// TRANSCRIBE THIS PLEASE . MAYBE SHORTEN IT A BIT
function loadEnvVariables($keys) {
    $envPath = __DIR__ . '/../.env';
    $variables = [];
    if (file_exists($envPath)) {
        $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            if (strpos(trim($line), '#') === 0) {
                continue;
            }
            list($key, $value) = explode('=', $line, 2);
            $key = trim($key);
            $value = trim($value);
            if (in_array($key, $keys)) {
                $variables[$key] = $value;
            }
        }
    }
    return $variables;
}
?>