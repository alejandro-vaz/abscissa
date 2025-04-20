<?php 
// FUNCTION TO REGEX CHECK A STRING
function check(string $pattern, $value, string $name) {
    if (isset($value)) {
        if (!preg_match($pattern, strval($value))) {
            throw new regexError($name);
        }
    }
}
?>