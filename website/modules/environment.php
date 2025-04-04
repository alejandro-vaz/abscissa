<?php
function load($request) {
    $path = __DIR__ . '/../.env';
    $variables = [];
    if (file_exists($path)) {
        $content = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($content as $line) {
            // CONTINUE IF COMMENT
            if (strpos(trim($line), '#') === 0) {
                continue;
            }
            // GET DATA PAIR AND TRIM IT
            list($key, $value) = explode('=', $line, 2);
            $key = trim($key);
            $value = trim($value);
            // ADD KEY AND VALUE IF NOT EMPTY
            if (in_array($key, $request)) {
                $variables[$key] = $value;
            }
        }
    }
    return $variables;
}
?>