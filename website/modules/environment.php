<?php
function load($request) {
    // SETS DATA
    $path = __DIR__ . '/../.env';
    $variables = [];
    // CHECK IF FILE EXISTS
    if (!file_exists($path)) {
        throw new environmentNotFoundException("");
    }
    // GETS CONTENT
    $content = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    // ITERATES OVER EACH LINE
    foreach ($content as $line) {
        // CONTINUE IF COMMENT
        if (strpos(trim($line), '#') === 0) {
            continue;
        }
        // GET DATA PAIR AND TRIM IT
        list($key, $value) = explode('=', $line, 2);
        $key = trim($key);
        $value = trim($value);
        // STORE VARIABLE
        $variables[$key] = $value;
    }
    // CHECK IF REQUESTED VARIABLES ARE PRESENT
    foreach ($request as $variable) {
        if (!array_key_exists($variable, $variables)) {
            throw new environmentVariableNotFoundException("$variable");
        }
    }
    return array_intersect_key($variables, array_flip($request));
}
?>