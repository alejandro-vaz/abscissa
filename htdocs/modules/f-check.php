<?php 
function check($pattern, $value, $name) {
    if (isset($value)) {
        if (!preg_match($pattern, $value)) {
            throw new regexError($name);
        }
    }
}
?>