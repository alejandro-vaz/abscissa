<?php 
function test($pattern, $value, $name) {
    if (!preg_match($pattern, $value)) {
        throw new regexException($name);
    }
}
?>