<?php
// INITIALIZE
global $ENV;
$ENV = [];
$path = __DIR__ . '/../.env';

// CHECK IF FILE EXISTS
if (!file_exists($path)) {
    throw new environmentNotFoundException("Environment file not found at: $path");
}

// GET CONTENT AND ITERATE ADDING TO ENV
$content = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
foreach ($content as $line) {
    // SKIP COMMENTS
    if (strpos(trim($line), '#') === 0) {
        continue;
    }
    // SPLIT KEY, TRIM AND CONVERT TO UPPERCASE TO VARIABLES
    list($key, $value) = explode('=', $line, 2);
    $key = strtoupper(trim($key));
    $value = trim($value);
    $ENV[$key] = $value;
}
?>